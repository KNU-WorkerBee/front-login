import React, { useState } from 'react';
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Card, 
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Modal,
  Paper,
  Chip
} from '@mui/material';
import { AccountCircle, CloudUpload, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  // 파일 업로드 처리
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // API 호출 로직 구현
    console.log('파일 업로드:', selectedFile);
    setShowResults(true);
    setOpenUploadModal(false);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* 헤더 */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LectureLens
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={() => navigate('/mypage')}
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>

      {/* 메인 컨텐츠 */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          홍길동님, 반갑습니다!
        </Typography>

        {/* 업로드 버튼 */}
        <Card sx={{ mt: 4, mb: 4 }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              이곳에서 강의를 업로드하고 AI 요약을 받으세요.
            </Typography>
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              size="large"
              onClick={() => setOpenUploadModal(true)}
              sx={{ mt: 2 }}
            >
              강의 업로드하기
            </Button>
          </CardContent>
        </Card>

        {/* 결과 표시 영역 */}
        {showResults && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              강의 요약
            </Typography>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography paragraph>
                첫 번째 요약 문장이 들어갑니다.
              </Typography>
              <Typography paragraph>
                두 번째 요약 문장이 들어갑니다.
              </Typography>
              <Typography>
                세 번째 요약 문장이 들어갑니다.
              </Typography>
            </Paper>

            <Typography variant="h5" gutterBottom>
              키워드
            </Typography>
            <Box sx={{ mb: 4 }}>
              {['AI', '학습', '리뷰', '키워드1', '키워드2'].map((keyword) => (
                <Chip
                  key={keyword}
                  label={`#${keyword}`}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>

            <Button
              variant="outlined"
              onClick={() => setShowFullText(!showFullText)}
              sx={{ mb: 2 }}
            >
              {showFullText ? 'STT 전체 내용 접기' : 'STT 전체 내용 보기'}
            </Button>

            {showFullText && (
              <Paper sx={{ p: 3, mb: 4, maxHeight: 300, overflow: 'auto' }}>
                <Typography>
                  STT로 변환된 전체 텍스트가 이곳에 표시됩니다...
                </Typography>
              </Paper>
            )}

            <Button
              variant="contained"
              color="secondary"
              sx={{ mb: 4 }}
            >
              단답형 퀴즈 만들기
            </Button>
          </Box>
        )}

        {/* 최근 강의 목록 */}
        <Typography variant="h5" gutterBottom>
          최근 강의 목록
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="인공지능 개론 1강" 
              secondary="2024-01-20" 
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="데이터베이스 2강" 
              secondary="2024-01-19" 
            />
          </ListItem>
        </List>
      </Container>

      {/* 파일 업로드 모달 */}
      <Modal
        open={openUploadModal}
        onClose={() => setOpenUploadModal(false)}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">
              강의 파일 업로드
            </Typography>
            <IconButton onClick={() => setOpenUploadModal(false)}>
              <Close />
            </IconButton>
          </Box>
          <Typography sx={{ mb: 2 }}>
            mp3, wav 등 형식의 강의 파일을 업로드하세요.
          </Typography>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            style={{ marginBottom: '20px' }}
          />
          {selectedFile && (
            <Typography sx={{ mb: 2 }}>
              선택된 파일: {selectedFile.name}
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile}
            fullWidth
          >
            업로드
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard; 