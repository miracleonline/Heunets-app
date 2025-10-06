import React, { createContext, useEffect, useState } from 'react';
import { login as apiLogin, register as apiRegister, me as apiMe } from '../api/auth';

export const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setLoading(false);
    apiMe()
      .then(res => {
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      })
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const res = await apiLogin({ email, password });
    const token = res.data.token?.access_token || res.data.access_token || res.data.token;
    localStorage.setItem('token', token);
    const meRes = await apiMe();
    setUser(meRes.data);
    localStorage.setItem('user', JSON.stringify(meRes.data));
  }

  async function register(payload: any) {
    const res = await apiRegister(payload);
    const token = res.data.token?.access_token || res.data.access_token || res.data.token;
    localStorage.setItem('token', token);
    const meRes = await apiMe();
    setUser(meRes.data);
    localStorage.setItem('user', JSON.stringify(meRes.data));
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
