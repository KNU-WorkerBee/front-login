import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { protectedAPI } from '../services/api';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // 파일 선택 처리
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
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

  // 파일 업로드 처리
  const handleUpload = async () => {
    if (!uploadedFile) {
      alert('업로드할 파일을 선택해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('audio', uploadedFile);
      
      const result = await protectedAPI.uploadLecture(formData);
      console.log('업로드 성공:', result);
      
      // 업로드 후 상태 초기화
      setUploadedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      alert('파일이 성공적으로 업로드되었습니다.');
    } catch (error) {
      console.error('Upload error:', error);
      alert('업로드 중 오류가 발생했습니다.');
    }
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
                  >
                    삭제
                  </Button>
                </Alert>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* 업로드 버튼 */}
        <div className="d-grid gap-2">
          <Button 
            variant="success" 
            onClick={handleUpload}
            disabled={!uploadedFile}
            size="lg"
          >
            파일 업로드
          </Button>
        </div>
      </Container>
    </Layout>
  );
};

export default Dashboard; 