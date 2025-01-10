import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// 정규식 패턴을 컴포넌트 외부 상수로 정의
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9가-힣]{2,20}$/;
const PASSWORD_REGEX = /^.{1,}$/;  // 비밀번호 조건 제거 (1글자 이상이면 됨)

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
    
    // 먼저 데이터 업데이트
    setSignupData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // 즉시 유효성 검사 실행
    let emailIsValid = name === 'email' ? EMAIL_REGEX.test(value) : EMAIL_REGEX.test(signupData.email);
    let usernameIsValid = name === 'username' ? USERNAME_REGEX.test(value) : USERNAME_REGEX.test(signupData.username);
    let passwordIsValid = name === 'password' ? PASSWORD_REGEX.test(value) : PASSWORD_REGEX.test(signupData.password);

    // 에러 메시지 설정 (eval 제거)
    setErrors(prev => ({
      ...prev,
      [name]: 
        name === 'email' 
          ? (!emailIsValid ? '올바른 이메일 형식이 아닙니다' : '')
          : name === 'username'
            ? (!usernameIsValid ? '2-20자의 영문, 숫자, 한글만 사용 가능합니다' : '')
            : (!passwordIsValid ? '비밀번호를 입력해주세요' : '')
    }));

    // 전체 폼 유효성 설정
    setIsFormValid(emailIsValid && usernameIsValid && passwordIsValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await signup(signupData.email, signupData.password, signupData.username);
        // 회원가입 성공 시 받은 토큰을 저장
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        // Dashboard로 이동
        navigate('/dashboard');
      } catch (error) {
        // 에러는 useAuth 내에서 처리됨
        console.error('회원가입 실패:', error);
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
              onClick={() => navigate('/')}
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