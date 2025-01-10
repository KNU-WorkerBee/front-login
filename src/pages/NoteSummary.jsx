import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import '../styles/NoteSummary.css';

function NoteSummary() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('텍스트를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // API 호출 예시 (실제 구현 시 대체 필요)
      // const response = await fetch('/api/summarize', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ text }),
      // });
      // const data = await response.json();
      
      // 임시 응답 (API 연동 전)
      setTimeout(() => {
        setSummary({
          summary: "여기에 AI가 생성한 요약이 표시됩니다...",
          keywords: ["키워드1", "키워드2", "키워드3"],
          importance: "중요도 높음"
        });
        setIsLoading(false);
      }, 2000);

    } catch (err) {
      setError('요약 생성 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="mb-4">노트 요약</h2>

      {/* 텍스트 입력 섹션 */}
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>텍스트 입력</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="요약할 텍스트를 입력하세요..."
              />
            </Form.Group>
            <div className="d-grid">
              <Button 
                type="submit" 
                variant="primary"
                disabled={isLoading || !text.trim()}
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
                  '요약 생성하기'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

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
  );
}

export default NoteSummary; 