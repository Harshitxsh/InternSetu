/**
 * API Client — InternSetu v2.0
 *
 * Lightweight fetch wrapper that:
 * 1. Reads the custom JWT from localStorage ('internsetu_jwt').
 * 2. Attaches "Authorization: Bearer <token>" to every outgoing request.
 * 3. Auto-handles 401 responses by clearing the token.
 */

const API_BASE = 'http://localhost:8000/api';
const TOKEN_KEY = 'internsetu_jwt';

// ── Token helpers ────────────────────────────────────────────────────────────

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Decode a JWT payload without verification (client-side convenience only).
 * NEVER use this for security — the backend verifies signatures.
 */
export function decodeTokenPayload(token: string): Record<string, any> | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// ── Core request function ────────────────────────────────────────────────────

async function request<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // Auto-clear token on 401
  if (res.status === 401) {
    clearToken();
    // The AuthProvider will detect the missing token and redirect to login
    throw new Error('Unauthorized — session expired');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(body.detail || `API error ${res.status}`);
  }

  return res.json();
}

// ── Public API ───────────────────────────────────────────────────────────────

export const api = {
  get: <T = any>(path: string) => request<T>(path, { method: 'GET' }),

  post: <T = any>(path: string, body?: any) =>
    request<T>(path, {
      method: 'POST',
      body: body != null ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(path: string, body?: any) =>
    request<T>(path, {
      method: 'PUT',
      body: body != null ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(path: string) => request<T>(path, { method: 'DELETE' }),
};
