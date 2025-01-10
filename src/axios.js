import axios from 'axios';

// API 기본 URL 설정
axios.defaults.baseURL = 'http://34.22.101.228:8080';  // 마지막 슬래시 제거

// 요청 인터셉터 설정
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios; 