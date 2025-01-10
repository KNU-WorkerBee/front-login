import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const username = "사용자";  // 나중에 실제 사용자 정보로 대체

  const handleLogout = () => {
    logout();
    navigate('/LoginPage');
  };

  return (
    <div className="layout">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand onClick={() => navigate('/Dashboard')} style={{ cursor: 'pointer' }}>
            LectureLens
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {/* 왼쪽 메뉴 */}
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate('/Dashboard')}>대시보드</Nav.Link>
              <Nav.Link onClick={() => navigate('/summary')}>노트 요약</Nav.Link>
              <Nav.Link onClick={() => navigate('/quiz')}>퀴즈</Nav.Link>
            </Nav>
            {/* 오른쪽 메뉴 */}
            <Nav>
              <Nav.Link onClick={() => navigate('/MyPage')}>
                <i className="bi bi-person-circle"></i> {username}
              </Nav.Link>
              <Button variant="outline-light" onClick={handleLogout}>
                로그아웃
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* 메인 컨텐츠 */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout; 