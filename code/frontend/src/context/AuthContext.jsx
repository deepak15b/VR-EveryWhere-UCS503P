import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vr_current_user');
    return saved ? JSON.parse(saved) : null;
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
      const res = await api.login(username, password);
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
      const res = await api.register(userData);
      setUser(res.user);
      return res.user;
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
        isAuthenticated: !!user,
        isGuest: !!user?.isGuest,
        login,
        loginAsGuest,
        register,
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
