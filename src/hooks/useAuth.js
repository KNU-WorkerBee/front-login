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

  const logout = () => {
    localStorage.removeItem('token');  // 토큰 제거
  };

  return { login, logout, loading };
}; 