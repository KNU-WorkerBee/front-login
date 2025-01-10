import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditPassword = () => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    // API 호출 로직 구현
    console.log('비밀번호 변경');
    navigate('/mypage');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          비밀번호 변경
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="password"
            label="현재 비밀번호"
            value={passwords.current}
            onChange={(e) => setPasswords({...passwords, current: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="새 비밀번호"
            value={passwords.new}
            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="새 비밀번호 확인"
            value={passwords.confirm}
            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
            margin="normal"
          />
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mt: 4
          }}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{ minWidth: '120px' }}
            >
              저장
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/mypage')}
              size="large"
              sx={{ minWidth: '120px' }}
            >
              취소
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditPassword; 