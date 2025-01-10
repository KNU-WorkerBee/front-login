import React from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import '../styles/MyPage.css';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const { user } = useAuthContext();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  console.log('Current user:', user);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      console.log('회원 탈퇴 처리');
    }
  };

  const recentActivities = [
    { id: 1, type: '녹음', name: '인공지능과 기계학습 1주차', date: '2024-03-15', status: '변환중' },
    { id: 2, type: '요약', name: '데이터베이스 2주차', date: '2024-03-14', pages: 3 },
    { id: 3, type: '퀴즈', name: '알고리즘 3주차', date: '2024-03-13', score: 90 },
    { id: 4, type: '녹음', name: '컴퓨터구조 1주차', date: '2024-03-12', status: '완료' },
  ];

  return (
    <Layout>
      <Container className="py-5">
        <Row className="equal-height-row">
          {/* 사용자 프로필 섹션 */}
          <Col lg={4} className="mb-4 mb-lg-0">
            <Card className="profile-card h-100">
              <Card.Body className="d-flex flex-column">
                <div className="text-center mb-4">
                  <div className="profile-image mb-3">
                    <i className="bi bi-person-circle display-1"></i>
                  </div>
                  <h3 className="user-name mb-1">{userInfo?.name || '사용자'}</h3>
                  <div className="user-info mb-4">
                    <p className="text-muted mb-2">
                      <i className="bi bi-envelope me-2"></i>
                      {userInfo?.email}
                    </p>
                    <p className="text-muted mb-2">
                      <i className="bi bi-calendar me-2"></i>
                      가입일: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {/* 프로필 관리 버튼 */}
                <div className="profile-actions mt-auto">
                  <Button 
                    variant="outline-primary" 
                    className="me-2 w-100 mb-2"
                    onClick={handleEditProfile}
                  >
                    <i className="bi bi-pencil me-2"></i>
                    정보 수정
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    className="w-100"
                    onClick={handleDeleteAccount}
                  >
                    <i className="bi bi-person-x me-2"></i>
                    탈퇴하기
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* 활동 내역 섹션 */}
          <Col lg={8}>
            <Card className="h-100">
              <Card.Header className="bg-transparent">
                <h4 className="mb-0">최근 활동</h4>
              </Card.Header>
              <ListGroup variant="flush" className="flex-grow-1">
                {recentActivities.map(activity => (
                  <ListGroup.Item key={activity.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <Badge 
                        bg={
                          activity.type === '녹음' ? 'primary' : 
                          activity.type === '요약' ? 'success' : 
                          'info'
                        } 
                        className="me-2"
                      >
                        {activity.type}
                      </Badge>
                      {activity.name}
                    </div>
                    <div className="text-end">
                      <div className="text-muted small">{activity.date}</div>
                      {activity.status && (
                        <Badge bg={activity.status === '완료' ? 'success' : 'warning'}>
                          {activity.status}
                        </Badge>
                      )}
                      {activity.score && (
                        <Badge bg="info">
                          {activity.score}점
                        </Badge>
                      )}
                      {activity.pages && (
                        <Badge bg="success">
                          {activity.pages}페이지
                        </Badge>
                      )}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default MyPage; 