import React, { useState, useRef } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import Layout from '../components/Layout';
import '../styles/Dashboard.css';

function Dashboard() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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

    // 여기에 파일 업로드 API 호출 로직 구현
    try {
      const formData = new FormData();
      formData.append('audio', fileToUpload);

      // API 호출 예시
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData
      // });

      alert('파일이 성공적으로 업로드되었습니다.');
      // 업로드 후 상태 초기화
      setAudioURL(null);
      setUploadedFile(null);
      setRecordedBlob(null);
    } catch (error) {
      console.error('Upload error:', error);
      alert('업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <Layout setIsLoggedIn={setIsLoggedIn}>
      <Container>
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
                <Button variant="danger" onClick={stopRecording}>
                  녹음 중지
                </Button>
              )}
            </div>

            {/* 녹음 미리보기 */}
            {audioURL && (
              <div className="mt-3">
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
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="audio/*"
              className="form-control mb-3"
            />
            {uploadedFile && (
              <Alert variant="info">
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
          >
            파일 업로드
          </Button>
        </div>
      </Container>
    </Layout>
  );
}

export default Dashboard; 