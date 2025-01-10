import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import '../styles/NoteSummary.css';
import Layout from '../components/Layout';

function NoteSummary() {
  const [transcribedText, setTranscribedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dashboard에서 저장한 텍스트 불러오기
    const savedText = localStorage.getItem('transcribedText');
    if (savedText) {
      setTranscribedText(savedText);
    }

    // 컴포넌트가 언마운트될 때 localStorage 초기화
    return () => {
      localStorage.removeItem('transcribedText');
    };
  }, []);

  const handleTextChange = (e) => {
    setTranscribedText(e.target.value);
    // 수정된 텍스트를 localStorage에 저장
    localStorage.setItem('transcribedText', e.target.value);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSummarize = async () => {
    if (!transcribedText.trim()) {
      setError('텍스트를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 임시 응답 (API 연동 전)
      setTimeout(() => {
        setSummary({
          summary: "여기에 AI가 생성한 요약이 표시됩니다...",
          keywords: [
            "인공지능",
            "머신러닝",
            "딥러닝",
            "데이터 분석",
            "알고리즘"
          ],
          importance: "중요도 높음"
        });
        setIsLoading(false);
      }, 2000);

    } catch (err) {
      setError('요약 생성 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  const handleClearText = () => {
    if (window.confirm('모든 텍스트를 삭제하시겠습니까?')) {
      setTranscribedText('');
      localStorage.removeItem('transcribedText');
      setSummary(null); // 요약 결과도 함께 초기화
    }
  };

  return (
    <Layout>
      <Container className="py-4">
        <h2 className="mb-4">강의 요약</h2>

        {/* 텍스트 입력 섹션 */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-center">
              <span>변환된 텍스트</span>
              <div className="d-flex gap-2">
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={handleEditToggle}
                >
                  {isEditing ? '완료' : '수정'}
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={handleClearText}
                >
                  삭제
                </Button>
              </div>
            </Card.Title>
            
            <Form.Group className="mt-3">
              <Form.Control
                as="textarea"
                rows={10}
                value={transcribedText}
                onChange={handleTextChange}
                disabled={!isEditing}
                placeholder="변환된 텍스트가 여기에 표시됩니다..."
              />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* 요약 버튼 */}
        <div className="d-grid gap-2 mb-4">
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleSummarize}
            disabled={isLoading || !transcribedText.trim()}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                요약 생성 중...
              </>
            ) : (
              'AI 요약 시작'
            )}
          </Button>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {/* 요약 결과 섹션 */}
        {summary && (
          <Card>
            <Card.Body>
              <h4 className="mb-3">요약 결과</h4>
              <div className="summary-content mb-4">
                <p>{summary.summary}</p>
              </div>

              <h5 className="mb-2">주요 키워드</h5>
              <div className="keywords-container mb-3">
                {summary.keywords.map((keyword, index) => (
                  <span key={index} className="keyword-badge">
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="importance-indicator">
                <strong>중요도:</strong> {summary.importance}
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>
    </Layout>
  );
}

export default NoteSummary; 