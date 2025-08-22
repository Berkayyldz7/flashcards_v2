const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5001';

export function getToken() {
  return localStorage.getItem('token') || '';
}
export function setToken(t) {
  if (t) localStorage.setItem('token', t);
  else localStorage.removeItem('token');
}

export async function login(username, password) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error((await res.json().catch(()=>({}))).error || 'Login başarısız');
  return res.json();
}

export async function register(username, password, email) {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email }),
  });
  if (!res.ok) throw new Error((await res.json().catch(()=>({}))).error || 'Register başarısız');
  return res.json();
}

export async function me() {
  const res = await fetch(`${BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) return null;
  return res.json();
}
