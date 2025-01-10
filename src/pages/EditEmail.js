import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditEmail = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 호출 로직 구현
    console.log('새 이메일:', email);
    navigate('/mypage');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          이메일 수정
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="새 이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default EditEmail; 