import axios from '../axios';
//로그인시 토큰 저장
export const authAPI = {
  login: async (userData) => {
    try {
      const response = await axios.post('/api/auth/login', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('토큰 저장 완료');
      }
      return response.data;
    } catch (error) {
      console.error('Login API error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  signup: async (email, password, name) => {
    try {
      console.log('Signup API 호출:', { email, password, name });
      const response = await axios.post('/api/auth/signup', { email, password, name });
      console.log('Signup API 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('Signup API error:', error.response?.data || error.message);
      throw error;
    }
  }
}; 

// 보호된 API 엔드포인트를 위한 서비스 추가
export const protectedAPI = {
  // 사용자 정보 가져오기
  getUserInfo: async () => {
    try {
      const response = await axios.get('/api/user/info');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 강의 업로드
  uploadLecture: async (formData) => {
    try {
      const response = await axios.post('/api/lectures/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 강의 목록 가져오기
  getLectures: async () => {
    try {
      const response = await axios.get('/api/lectures');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 강의 상세 정보 가져오기
  getLectureDetails: async (lectureId) => {
    try {
      const response = await axios.get(`/api/lectures/${lectureId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 