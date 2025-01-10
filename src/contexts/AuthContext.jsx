import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // API 호출 등의 로직
      setIsLoggedIn(true);
      setLoading(false);
      return { token: 'dummy-token' };
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signup = async (email, password, username) => {
    setLoading(true);
    try {
      // API 호출 등의 로직
      setIsLoggedIn(true);
      localStorage.setItem('username', username);
      setLoading(false);
      return { token: 'dummy-token' };
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const value = {
    isLoggedIn,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 