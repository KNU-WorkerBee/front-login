import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';
import Layout from '../components/Layout';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080', // 서버 포트 수정
  headers: {
    'Content-Type': 'application/json',
  }
});

const Dashboard = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [transcriptionStatus, setTranscriptionStatus] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // 파일 선택 처리
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setUploadedFile(file);
      } else {
        alert('오디오 파일만 업로드 가능합니다.');
      }
    }
  };

  // 드래그 앤 드롭 처리
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(file);
    } else {
      alert('오디오 파일만 업로드 가능합니다.');
    }
  };

  // 파일 삭제 처리
  const handleDelete = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 더미 지연 함수
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // 파일 업로드 및 텍스트 변환 처리
  const handleUpload = async () => {
    if (!uploadedFile) {
      alert('업로드할 파일을 선택해주세요.');
      return;
    }

    try {
      setIsUploading(true);
      setTranscriptionStatus('진행중');
      setIsTranscribing(true);

      const formData = new FormData();
      formData.append('file', uploadedFile);
      
      // 요청 전에 파일 정보 로깅
      console.log('Uploading file:', {
        name: uploadedFile.name,
        type: uploadedFile.type,
        size: uploadedFile.size
      });

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('인증 토큰이 없습니다.');
      }

      const response = await api.post('/api/speech/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        timeout: 30000
      });

      if (response.data && response.data.transcript) { // 'text' 대신 'transcript'로 변경
        const convertedText = response.data.transcript;
        setTranscribedText(convertedText);
        localStorage.setItem('transcribedText', convertedText);
        
        setUploadedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        alert('파일이 성공적으로 변환되었습니다.');
        setTranscriptionStatus('완료');
      } else {
        throw new Error('텍스트 변환 결과가 없습니다.');
      }
      
    } catch (error) {
      console.error('Upload error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      let errorMessage = '텍스트 변환 중 오류가 발생했습니다.';
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = '인증이 필요합니다. 다시 로그인해주세요.';
            navigate('/login');
            break;
          case 413:
            errorMessage = '파일 크기가 너무 큽니다.';
            break;
          case 415:
            errorMessage = '지원하지 않는 파일 형식입니다.';
            break;
          case 500:
            errorMessage = '서버 오류가 발생했습니다.';
            break;
          default:
            errorMessage = `오류가 발생했습니다: ${error.response.data.message || '알 수 없는 오류'}`;
        }
      } else if (error.request) {
        errorMessage = '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.';
      }

      alert(errorMessage);
      setTranscriptionStatus('실패');
    } finally {
      setIsUploading(false);
      setIsTranscribing(false);
    }
  };

  const handleSummarize = () => {
    navigate('/summary');
  };

  return (
    <Layout>
      <Container className="py-4">
        <h2 className="mb-4">강의 업로드</h2>

        {/* 파일 업로드 섹션 */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>녹음파일 업로드</Card.Title>
            <div 
              className="upload-section"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="audio/*"
                style={{ display: 'none' }}
              />
              <p className="mb-0">
                클릭하여 파일을 선택하거나 파일을 여기로 드래그하세요
              </p>
            </div>
            {uploadedFile && (
              <div className="mt-3">
                <Alert variant="info" className="d-flex justify-content-between align-items-center">
                  <span>선택된 파일: {uploadedFile.name}</span>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={handleDelete}
                    disabled={isUploading}
                  >
                    삭제
                  </Button>
                </Alert>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* 업로드 버튼 */}
        <div className="d-grid gap-2 mb-4">
          <Button 
            variant="success" 
            onClick={handleUpload}
            disabled={!uploadedFile || isUploading}
            size="lg"
          >
            {isUploading ? '업로드 중...' : '파일 업로드'}
          </Button>
        </div>

        {/* 텍스트 변환 상태 섹션 */}
        {transcriptionStatus && (
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>텍스트 변환</Card.Title>
              <div className="text-conversion-status">
                {isTranscribing ? (
                  <div className="d-flex align-items-center">
                    <div className="spinner-border text-primary me-2" role="status">
                      <span className="visually-hidden">변환중...</span>
                    </div>
                    <span>텍스트 변환 진행중...</span>
                  </div>
                ) : transcriptionStatus === '완료' ? (
                  <div>
                    <div className="text-success mb-3">
                      <i className="bi bi-check-circle me-2"></i>
                      텍스트 변환이 완료되었습니다.
                    </div>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      value={transcribedText}
                      readOnly
                      className="mb-3"
                    />
                  </div>
                ) : (
                  <div className="text-danger">
                    <i className="bi bi-x-circle me-2"></i>
                    텍스트 변환에 실패했습니다.
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        )}

        {/* 요약하기 버튼 */}
        {transcriptionStatus === '완료' && (
          <div className="d-grid gap-2">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleSummarize}
            >
              요약하기
            </Button>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Dashboard; 