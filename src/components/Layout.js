import React from 'react';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const getDisplayName = () => {
    if (!user) return '사용자';
    return user.username || user.name || user.email?.split('@')[0] || '사용자';
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
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
              <Dropdown align="end">
                <Dropdown.Toggle variant="dark" id="user-dropdown" className="nav-user-dropdown">
                  <i className="bi bi-person-circle"></i> {getDisplayName()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate('/MyPage')}>
                    마이페이지
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    로그아웃
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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