import axios from '../axios';

export const authAPI = {
  login: (email, password) => 
    axios.post('/api/auth/login', { email, password }),
  
  signup: (email, password, name) => 
    axios.post('/api/auth/signup', { email, password, name })
}; 