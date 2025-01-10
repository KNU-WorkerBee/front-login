import { useState } from 'react';
import { authAPI } from '../services/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await authAPI.login(userData);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    setLoading(true);
    try {
      const response = await authAPI.signup(email, password, name);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
  };

  return { login, signup, logout, loading };
}; 