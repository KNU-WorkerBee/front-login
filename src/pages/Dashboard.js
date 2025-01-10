import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [transcriptionStatus, setTranscriptionStatus] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // 더미 텍스트 데이터 (나중에 실제 변환된 텍스트로 대체)
  const dummyTranscription = `
    안녕하세요. 오늘은 인공지능의 기초에 대해 알아보겠습니다.
    인공지능은 인간의 학습능력과 추론능력, 지각능력을 인공적으로 구현한 컴퓨터 시스템을 말합니다.
    머신러닝은 인공지능의 한 분야로, 데이터를 기반으로 패턴을 학습하고 결과를 예측하는 기술입니다.
  `.trim();

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

  // 파일 업로드 처리
  const handleUpload = async () => {
    if (!uploadedFile) {
      alert('업로드할 파일을 선택해주세요.');
      return;
    }

    try {
      setIsUploading(true);
      await delay(2000);

      const dummyResponse = {
        success: true,
        data: {
          fileId: Math.random().toString(36).substr(2, 9),
          fileName: uploadedFile.name,
          uploadedAt: new Date().toISOString(),
          fileUrl: `https://example.com/uploads/${uploadedFile.name}`,
          transcription: dummyTranscription
        }
      };

      console.log('업로드 성공:', dummyResponse);
      
      setUploadedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      alert('파일이 성공적으로 업로드되었습니다.');
      setTranscriptionStatus('진행중');
      setIsTranscribing(true);
      
      await delay(3000);
      setTranscriptionStatus('완료');
      setIsTranscribing(false);
      localStorage.setItem('transcribedText', dummyResponse.data.transcription);
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
      setTranscriptionStatus('실패');
    } finally {
      setIsUploading(false);
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
                      value={dummyTranscription}
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