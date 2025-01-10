import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // 정규식 패턴
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // 유효성 검사
    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setErrors(prev => ({
          ...prev,
          email: '올바른 이메일 형식이 아닙니다'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          email: ''
        }));
      }
    }

    if (name === 'password') {
      if (!passwordRegex.test(value)) {
        setErrors(prev => ({
          ...prev,
          password: '최소 8자 이상의 영문자와 숫자를 포함해야 합니다'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          password: ''
        }));
      }
    }
  };

  // 폼 유효성 검사
  useEffect(() => {
    const isValid = emailRegex.test(loginData.email) && 
                   passwordRegex.test(loginData.password);
    setIsFormValid(isValid);
  }, [loginData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await login(loginData.email, loginData.password);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('로그인 실패:', error);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ 
      mt: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        LectureLens
      </Typography>
      
      <Paper elevation={3} sx={{ p: 6, width: '100%' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
          로그인
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="이메일"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          
          <TextField
            fullWidth
            label="비밀번호"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.password}
            helperText={errors.password}
          />
          
          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            disabled={!isFormValid || loading}
            sx={{ 
              mt: 4, 
              mb: 2,
              bgcolor: isFormValid ? 'primary.main' : 'grey.400',
              '&:hover': {
                bgcolor: isFormValid ? 'primary.dark' : 'grey.400'
              }
            }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Button
              color="primary"
              onClick={() => navigate('/signup')}
              sx={{ textTransform: 'none' }}
            >
              아직 회원이 아니신가요? 회원가입하기
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage; 