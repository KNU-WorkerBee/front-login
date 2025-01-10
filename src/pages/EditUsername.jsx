import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditUsername = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 호출 로직 구현
    console.log('새 사용자 이름:', username);
    navigate('/mypage');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          사용자 이름 수정
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="새 사용자 이름"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',  // 버튼들을 양쪽 끝으로 정렬
            mt: 4  // 상단 여백 추가
          }}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{ minWidth: '120px' }}  // 버튼 최소 너비 설정
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

export default EditUsername; 