import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { authService } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vr_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clean out legacy hardcoded mock users from older versions
        if (
          parsed.id === 'usr_1024170436' ||
          parsed.username === '1024170436' ||
          parsed.username === 'deepak_tiet' ||
          parsed.username === 'harnoor_tiet'
        ) {
          localStorage.removeItem('vr_current_user');
          return null;
        }
        return parsed;
      } catch (e) {
        localStorage.removeItem('vr_current_user');
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('vr_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vr_current_user');
    }
  }, [user]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await authService.login(username, password);
      api.setToken(res.token);
      setUser(res.user);
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = () => {
    const guestUser = {
      id: "usr_guest",
      username: "guest_explorer",
      name: "Guest Explorer",
      email: "guest@vreverywhere.internal",
      role: "GUEST",
      joinedDate: "Today",
      isGuest: true
    };
    api.setToken("guest-token");
    setUser(guestUser);
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await authService.register(userData);
      api.setToken(res.token);
      setUser(res.user);
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  const lookupAccount = async (identifier) => {
    setLoading(true);
    try {
      return await authService.lookupAccount(identifier);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (identifier, newPassword, autoLogin = true) => {
    setLoading(true);
    try {
      const res = await authService.resetPassword(identifier, newPassword);
      if (autoLogin && res.user && res.token) {
        api.setToken(res.token);
        setUser(res.user);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    api.setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && !user?.isGuest,
        isGuest: !!user?.isGuest,
        login,
        loginAsGuest,
        register,
        lookupAccount,
        resetPassword,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}