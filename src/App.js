import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import EditUsername from './pages/EditUsername';
import EditEmail from './pages/EditEmail';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* 기본 페이지 설정 */}
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/EditUsername" element={<EditUsername />} />
        <Route path="/EditEmail" element={<EditEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
