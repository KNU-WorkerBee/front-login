<<<<<<< HEAD:src/pages/LoginPage.js
import React, { useState, useEffect, useContext } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> f0f3655705dbbfd2861bd9de2ee2df081020e637:src/pages/LoginPage.jsx
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from '../contexts/AuthContext';

// 정규식 패턴을 컴포넌트 외부로 이동
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// 정규식 패턴을 컴포넌트 외부 상수로 정의
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PASSWORD_REGEX = /^.{1,}$/;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { setUser } = useContext(AuthContext);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

<<<<<<< HEAD:src/pages/LoginPage.js
  const [isFormValid, setIsFormValid] = useState(false);

=======
>>>>>>> f0f3655705dbbfd2861bd9de2ee2df081020e637:src/pages/LoginPage.jsx
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));

<<<<<<< HEAD:src/pages/LoginPage.js
    // 유효성 검사
    if (name === 'email') {
      if (!EMAIL_REGEX.test(value)) {
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

  };

  // 폼 유효성 검사
  useEffect(() => {
    const isValid = EMAIL_REGEX.test(loginData.email) && 
                   PASSWORD_REGEX.test(loginData.password);
    setIsFormValid(isValid);
  }, [loginData]);

=======
    // 즉시 유효성 검사 실행
    let emailIsValid = name === 'email' ? EMAIL_REGEX.test(value) : EMAIL_REGEX.test(loginData.email);
    let passwordIsValid = name === 'password' ? PASSWORD_REGEX.test(value) : PASSWORD_REGEX.test(loginData.password);

    // 에러 메시지 설정 (eval 제거)
    setErrors(prev => ({
      ...prev,
      [name]: name === 'email' 
        ? (!emailIsValid ? '올바른 이메일 형식이 아닙니다' : '')
        : (!passwordIsValid ? '비밀번호를 입력해주세요' : '')
    }));

    // 전체 폼 유효성 설정
    setIsFormValid(emailIsValid && passwordIsValid);
  };

>>>>>>> f0f3655705dbbfd2861bd9de2ee2df081020e637:src/pages/LoginPage.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ 
        email: loginData.email, 
        password: loginData.password 
      });
      if (response) {
        // 임시로 이메일을 username으로 사용
        setUser({
          username: loginData.email.split('@')[0], // 이메일에서 @ 앞부분만 사용
          email: loginData.email
        });
        navigate('/Dashboard');
      }
    } catch (error) {
      setError('로그인에 실패했습니다.');
      console.error('Login error:', error);
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
              onClick={() => navigate('/SignupPage')}
              sx={{ textTransform: 'none' }}
            >
              아직 회원이 아니신가요? 회원가입하기
            </Button>
          </Box>
        </form>
      </Paper>
      
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default LoginPage; 