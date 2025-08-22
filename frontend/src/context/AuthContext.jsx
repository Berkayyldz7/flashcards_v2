import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, setToken, me } from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      if (getToken()) {
        const data = await me().catch(()=>null);
        setUser(data?.user || null);
      }
      setReady(true);
    }
    init();
  }, []);

  function signin({ token, user }) {
    setToken(token);
    setUser(user);
  }
  function signout() {
    setToken('');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, ready, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
