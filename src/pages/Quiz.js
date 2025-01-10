import React, { useState } from 'react';
import { Container, Card, Button, Form, Alert, ProgressBar } from 'react-bootstrap';
import Layout from '../components/Layout';
import '../styles/Quiz.css';

function Quiz() {
  // 실제로는 API를 통해 AI가 생성한 퀴즈 데이터를 받아올 예정
  const [quizData, setQuizData] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  // AI에게 텍스트를 보내고 퀴즈를 생성하는 함수
  const generateQuiz = async () => {
    if (!textInput.trim()) {
      alert('텍스트를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // 실제 API 호출로 대체될 예정
      // const response = await api.generateQuiz(textInput);
      // setQuizData(response.data);
      
      // 임시 테스트용 데이터
      const mockQuizData = [
        {
          question: "입력된 텍스트에 대한 첫 번째 질문",
          options: ["보기 1", "보기 2", "보기 3", "보기 4"],
          correctAnswer: 0,
          explanation: "이것은 정답에 대한 설명입니다."
        },
        // ... 더 많은 퀴즈 데이터
      ];
      
      setQuizData(mockQuizData);
      setQuizStarted(true);
    } catch (error) {
      console.error('퀴즈 생성 오류:', error);
      alert('퀴즈 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;
    
    setIsLoading(true);
    try {
      // 실제 API 호출로 대체될 예정
      // const response = await api.checkAnswer({
      //   questionId: quizData[currentQuizIndex].id,
      //   selectedAnswer
      // });
      
      setShowResult(true);
    } catch (error) {
      console.error('답안 제출 오류:', error);
      alert('답안 제출 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentQuizIndex < quizData.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // 모든 퀴즈 완료
      setQuizStarted(false);
      setTextInput('');
      setQuizData([]);
      setCurrentQuizIndex(0);
    }
  };

  if (!quizStarted) {
    return (
      <Layout>
        <Container className="py-4">
          <div className="quiz-intro">
            <h2 className="text-center mb-4">AI 퀴즈 생성기</h2>
            <Card className="quiz-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <i className="bi bi-robot quiz-icon"></i>
                </div>
                <Form.Group className="mb-4">
                  <Form.Label className="quiz-label">학습하고 싶은 내용을 입력해주세요</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="텍스트를 입력하면 AI가 맞춤형 퀴즈를 생성합니다..."
                    className="quiz-textarea"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={generateQuiz}
                  disabled={isLoading || !textInput.trim()}
                  className="quiz-button w-100"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      퀴즈 생성 중...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-magic me-2"></i>
                      AI 퀴즈 생성하기
                    </>
                  )}
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </Layout>
    );
  }

  const currentQuiz = quizData[currentQuizIndex];
  const progress = ((currentQuizIndex + 1) / quizData.length) * 100;

  return (
    <Layout>
      <Container className="py-4">
        <div className="quiz-container">
          <h2 className="text-center mb-4">AI 생성 퀴즈</h2>
          <ProgressBar 
            now={progress} 
            className="mb-4 quiz-progress" 
            variant="success"
          />
          <Card className="quiz-card">
            <Card.Body>
              <div className="question-number">
                Question {currentQuizIndex + 1} of {quizData.length}
              </div>
              <Card.Title className="question-text mb-4">
                {currentQuiz.question}
              </Card.Title>
              <Form className="options-container">
                {currentQuiz.options.map((option, index) => (
                  <div
                    key={index}
                    className={`option-item ${
                      selectedAnswer === index ? 'selected' : ''
                    } ${
                      showResult
                        ? index === currentQuiz.correctAnswer
                          ? 'correct'
                          : selectedAnswer === index
                          ? 'incorrect'
                          : ''
                        : ''
                    }`}
                  >
                    <Form.Check
                      type="radio"
                      id={`option-${index}`}
                      label={option}
                      name="quiz-options"
                      checked={selectedAnswer === index}
                      onChange={() => setSelectedAnswer(index)}
                      disabled={showResult || isLoading}
                    />
                  </div>
                ))}
              </Form>
              
              {showResult && (
                <Alert 
                  variant={selectedAnswer === currentQuiz.correctAnswer ? "success" : "danger"}
                  className="result-alert"
                >
                  <div className="result-icon">
                    <i className={`bi ${
                      selectedAnswer === currentQuiz.correctAnswer 
                        ? "bi-check-circle" 
                        : "bi-x-circle"
                    }`}></i>
                  </div>
                  <div className="result-text">
                    <strong>
                      {selectedAnswer === currentQuiz.correctAnswer 
                        ? "정답입니다!" 
                        : "틀렸습니다."}
                    </strong>
                    <p className="explanation mt-2">
                      {currentQuiz.explanation}
                    </p>
                  </div>
                </Alert>
              )}

              <div className="d-grid gap-2 mt-4">
                {!showResult ? (
                  <Button 
                    variant="primary" 
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null || isLoading}
                    className="submit-button"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        채점 중...
                      </>
                    ) : (
                      '정답 확인'
                    )}
                  </Button>
                ) : (
                  <Button 
                    variant="success" 
                    onClick={handleNext}
                    className="next-button"
                  >
                    {currentQuizIndex < quizData.length - 1 ? (
                      <>
                        다음 문제
                        <i className="bi bi-arrow-right ms-2"></i>
                      </>
                    ) : (
                      '퀴즈 종료'
                    )}
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </Layout>
  );
}

export default Quiz; 