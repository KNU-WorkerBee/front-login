import React from 'react';
import { Container, Paper, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          마이페이지
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 4,
          mt: 6,
          mb: 4
        }}>
          <Button
            variant="contained"
            onClick={() => navigate('/mypage/edit-username')}
            size="large"
            sx={{ py: 2 }}
          >
            사용자 이름 수정
          </Button>
          
          <Button
            variant="contained"
            onClick={() => navigate('/mypage/edit-email')}
            size="large"
            sx={{ py: 2 }}
          >
            이메일 수정
          </Button>
          
          <Button
            variant="contained"
            onClick={() => navigate('/mypage/edit-password')}
            size="large"
            sx={{ py: 2 }}
          >
            비밀번호 변경
          </Button>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                if (window.confirm('정말로 탈퇴하시겠습니까?')) {
                  // 회원탈퇴 API 호출
                  console.log('회원탈퇴 처리');
                }
              }}
              size="large"
              sx={{ py: 2 }}
            >
              회원탈퇴
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default MyPage; 