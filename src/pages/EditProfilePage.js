import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

// 정규식 패턴
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9가-힣]{4,20}$/;

const EditProfilePage = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
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

    if (name === 'name') {
      setErrors(prev => ({
        ...prev,
        name: usernameRegex.test(value) ? '' : '4-20자의 영문, 숫자, 한글만 사용 가능합니다'
      }));
    }
  };

  // 폼 유효성 검사
  useEffect(() => {
    const isValid = 
      emailRegex.test(formData.email) && 
      usernameRegex.test(formData.name);
    setIsFormValid(isValid);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        // 여기에 실제 API 호출 로직이 들어갈 예정
        // 임시로 localStorage만 업데이트
        const updatedUserInfo = {
          name: formData.name,
          email: formData.email
        };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        
        alert('프로필이 성공적으로 수정되었습니다.');
        navigate('/mypage');
      } catch (error) {
        console.error('프로필 수정 실패:', error);
        alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
            프로필 수정
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="사용자명"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              error={!!errors.name}
              helperText={errors.name}
            />
            
            <TextField
              fullWidth
              label="이메일"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              error={!!errors.email}
              helperText={errors.email}
            />
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/mypage')}
              >
                취소
              </Button>
              
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={!isFormValid}
                sx={{ 
                  bgcolor: isFormValid ? 'primary.main' : 'grey.400',
                  '&:hover': {
                    bgcolor: isFormValid ? 'primary.dark' : 'grey.400'
                  }
                }}
              >
                저장
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default EditProfilePage; 