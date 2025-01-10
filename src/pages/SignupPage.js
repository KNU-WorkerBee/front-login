import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// 정규식 패턴 (컴포넌트 외부로 이동)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //
const usernameRegex = /^[a-zA-Z0-9가-힣]{4,20}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();

  const [signupData, setSignupData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // 유효성 검사
    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: emailRegex.test(value) ? '' : '올바른 이메일 형식이 아닙니다'
      }));
    }

    if (name === 'username') {
      setErrors(prev => ({
        ...prev,
        username: usernameRegex.test(value) ? '' : '4-20자의 영문, 숫자, 한글만 사용 가능합니다'
      }));
    }

    if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: passwordRegex.test(value) ? '' : '최소 8자 이상의 영문자와 숫자를 포함해야 합니다'
      }));
    }
  };

  // 폼 유효성 검사
  useEffect(() => {
    const isValid = 
      emailRegex.test(signupData.email) && 
      usernameRegex.test(signupData.username) && 
      passwordRegex.test(signupData.password);
    setIsFormValid(isValid);
  }, [signupData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await signup(
          signupData.email,
          signupData.password,
          signupData.username
        );
        
        console.log('회원가입 응답:', response);

        navigate('/LoginPage', { replace: true });
        
      } catch (error) {
        console.error('회원가입 실패:', error);
        // 에러 메시지 표시
        setErrors(prev => ({
          ...prev,
          submit: '회원가입에 실패했습니다. 다시 시도해주세요.'
        }));
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
          회원가입
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="이메일"
            name="email"
            type="email"
            value={signupData.email}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          
          <TextField
            fullWidth
            label="사용자명"
            name="username"
            value={signupData.username}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.username}
            helperText={errors.username}
          />
          
          <TextField
            fullWidth
            label="비밀번호"
            name="password"
            type="password"
            value={signupData.password}
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
            {loading ? '처리중...' : '회원가입'}
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Button
              color="primary"
              onClick={() => navigate('/LoginPage', { replace: true })}
              sx={{ textTransform: 'none' }}
            >
              이미 계정이 있으신가요? 로그인하기
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupPage;
