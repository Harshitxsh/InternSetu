// Firebase Client SDK Configuration for InternSetu v2.0
// Firebase project: internsetu-999
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyPlaceholderKeyReplaceWithActualFromFirebaseConsole",
  authDomain: "internsetu-999.firebaseapp.com",
  projectId: "internsetu-999",
  storageBucket: "internsetu-999.firebasestorage.app",
  messagingSenderId: "109479824049882237605",
  appId: "1:109479824049882237605:web:placeholder",
};

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

export const githubProvider = new GithubAuthProvider();
githubProvider.addScope('read:user');
githubProvider.addScope('public_repo');
// Store GitHub access token in state after sign-in

export default app;
