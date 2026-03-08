import { createContext, useState } from 'react';
import api from '../services/api';
import apiUrl from '../../apiUrl.json';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem('user');
    return s ? JSON.parse(s) : null;
  });

  const login = async (email, password) => {
    const res = await api.post(apiUrl.Login, { email, password });
    const { accessToken, refreshToken, user } = res.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    return user;
  };

  const register = async (name, email, password) => {
    const res = await api.post(apiUrl.Register, { name, email, password });
    const { accessToken, refreshToken, user } = res.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    return user;
  };

  const logout = async () => {
    const u = JSON.parse(localStorage.getItem('user') || null);
    if (u) {
      await api.post(apiUrl.Logout, { userId: u.id }).catch(() => { });
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    //localStorage.removeItem('user');
    setUser(null);
  };

  const updateImage = (image) => {
    const updated = { ...user, image };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return <AuthContext.Provider value={{ user, login, register, logout, updateImage }}>{children}</AuthContext.Provider>;
};
