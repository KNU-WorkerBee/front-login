import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { protectedAPI } from '../services/api';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // 녹음 시작
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setRecordedBlob(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('마이크 접근에 실패했습니다.');
    }
  };

  // 녹음 중지
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // 파일 선택 처리
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // 파일 업로드 처리
  const handleUpload = async () => {
    const fileToUpload = recordedBlob || uploadedFile;
    if (!fileToUpload) {
      alert('업로드할 파일을 선택하거나 녹음해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('audio', fileToUpload);
      
      const result = await protectedAPI.uploadLecture(formData);
      console.log('업로드 성공:', result);
      
      // 업로드 후 상태 초기화
      setAudioURL(null);
      setUploadedFile(null);
      setRecordedBlob(null);
      
      alert('파일이 성공적으로 업로드되었습니다.');
    } catch (error) {
      console.error('Upload error:', error);
      alert('업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <Layout>
      <Container className="py-4">
        <h2 className="mb-4">강의 녹음</h2>
        
        {/* 녹음 섹션 */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>직접 녹음하기</Card.Title>
            <div className="d-grid gap-2">
              {!isRecording ? (
                <Button variant="primary" onClick={startRecording}>
                  녹음 시작
                </Button>
              ) : (
                <div>
                  <Button variant="danger" onClick={stopRecording}>
                    녹음 중지
                  </Button>
                  <span className="ms-2 recording-indicator">● 녹음중</span>
                </div>
              )}
            </div>

            {/* 녹음 미리보기 */}
            {audioURL && (
              <div className="audio-preview">
                <h5>녹음 미리보기</h5>
                <audio controls src={audioURL} className="w-100" />
              </div>
            )}
          </Card.Body>
        </Card>

        {/* 파일 업로드 섹션 */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>파일 업로드</Card.Title>
            <div 
              className="upload-section"
              onClick={() => fileInputRef.current?.click()}
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
              <Alert variant="info" className="mt-3">
                선택된 파일: {uploadedFile.name}
              </Alert>
            )}
          </Card.Body>
        </Card>

        {/* 업로드 버튼 */}
        <div className="d-grid gap-2">
          <Button 
            variant="success" 
            onClick={handleUpload}
            disabled={!uploadedFile && !recordedBlob}
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