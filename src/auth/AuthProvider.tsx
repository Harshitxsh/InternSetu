/**
 * AuthProvider — InternSetu v2.0
 *
 * Hybrid OAuth-to-JWT flow:
 *   1. Firebase brokers the Google/GitHub OAuth popup on the client.
 *   2. The Firebase ID token is sent to POST /api/auth/login.
 *   3. The backend mints a custom JWT and returns it.
 *   4. The JWT is stored in localStorage; Firebase is signed out immediately.
 *   5. All subsequent API calls use the custom JWT via the api.ts interceptor.
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  GithubAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from './firebase';
import { User, UserRole } from '../types';
import { useAppStore } from '../store/appStore';
import { api, getToken, setToken, clearToken, decodeTokenPayload } from '../lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithGitHub: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// ── Helper: exchange Firebase token for custom JWT ───────────────────────────

async function exchangeForJWT(
  firebaseToken: string,
  githubToken?: string,
): Promise<{ access_token: string; user: any }> {
  // We can't use the api.ts helper here because we don't have a JWT yet.
  const res = await fetch('http://localhost:8000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firebase_token: firebaseToken,
      github_token: githubToken || undefined,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Login failed' }));
    throw new Error(err.detail);
  }
  return res.json();
}

// ── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { setUser: setStoreUser, setView, fetchJRI, fetchQuests } = useAppStore();

  // ── Restore session from localStorage on mount ──────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      const token = getToken();
      if (!token) {
        setUser(null);
        setStoreUser(null);
        setView('login');
        setLoading(false);
        return;
      }

      // Decode the JWT client-side to read uid/role (NOT for security)
      const payload = decodeTokenPayload(token);
      if (!payload || !payload.uid) {
        clearToken();
        setUser(null);
        setStoreUser(null);
        setView('login');
        setLoading(false);
        return;
      }

      // Check if token is expired
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        clearToken();
        setUser(null);
        setStoreUser(null);
        setView('login');
        setLoading(false);
        return;
      }

      // Fetch the full profile from the backend using the JWT
      try {
        const profile = await api.get(`/auth/me`);
        const appUser: User = {
          uid: profile.uid,
          name: profile.name || 'User',
          email: profile.email || '',
          photoURL: profile.photoURL || '',
          role: profile.role || null,
          is_onboarded: profile.is_onboarded || false,
          github_token: payload.github_token,
        };
        setUser(appUser);
        setStoreUser(appUser);
        navigateToView(appUser);

        if (appUser.role === 'STUDENT') {
          fetchJRI(appUser.uid);
          fetchQuests(appUser.uid);
        }
      } catch {
        // JWT is invalid or backend is down — clear it
        clearToken();
        setUser(null);
        setStoreUser(null);
        setView('login');
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  // ── Navigate based on role/onboarding state ─────────────────────────────
  function navigateToView(u: User) {
    if (!u.is_onboarded) {
      setView('onboarding');
    } else if (u.role === 'STUDENT') {
      setView('student-dashboard');
    } else if (u.role === 'COMPANY') {
      setView('company-dashboard');
    } else {
      setView('institution-dashboard');
    }
  }

  // ── Login with Firebase popup, then exchange for custom JWT ──────────────

  const handleOAuthLogin = async (
    result: UserCredential,
    githubToken?: string,
  ) => {
    const firebaseUser = result.user;
    const firebaseToken = await firebaseUser.getIdToken();

    // Exchange for custom JWT
    const { access_token, user: profileData } = await exchangeForJWT(
      firebaseToken,
      githubToken,
    );

    // Store the custom JWT
    setToken(access_token);

    // Sign out of Firebase immediately — session is now JWT-managed
    await firebaseSignOut(auth);

    // Build the app user
    const appUser: User = {
      uid: profileData.uid,
      name: profileData.name || firebaseUser.displayName || 'User',
      email: profileData.email || firebaseUser.email || '',
      photoURL: profileData.photoURL || firebaseUser.photoURL || '',
      role: profileData.role || null,
      is_onboarded: profileData.is_onboarded || false,
      github_token: githubToken,
    };

    setUser(appUser);
    setStoreUser(appUser);
    navigateToView(appUser);

    if (appUser.role === 'STUDENT') {
      fetchJRI(appUser.uid);
      fetchQuests(appUser.uid);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await handleOAuthLogin(result);
    } catch (e: any) {
      if (e.code === 'auth/popup-blocked') {
        console.error('Popup blocked — please allow popups for this site');
      } else {
        console.error('Google sign-in error:', e);
      }
    }
  };

  const signInWithGitHub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const githubToken = credential?.accessToken || undefined;
      await handleOAuthLogin(result, githubToken);
    } catch (e: any) {
      console.error('GitHub sign-in error:', e.code, e.message);
    }
  };

  // ── Sign out ────────────────────────────────────────────────────────────
  const signOut = async () => {
    clearToken();
    try { await firebaseSignOut(auth); } catch { /* already signed out */ }
    setUser(null);
    setStoreUser(null);
    setView('login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithGitHub, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
