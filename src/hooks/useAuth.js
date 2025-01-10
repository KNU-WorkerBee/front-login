import { useState } from 'react';
import { authAPI } from '../services/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || '로그인에 실패했습니다');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    try {
      setLoading(true);
      const response = await authAPI.signup(email, password, name);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || '회원가입에 실패했습니다');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, signup, loading, error };
}; 