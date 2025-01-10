import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import EditUsername from './pages/EditUsername';
import EditEmail from './pages/EditEmail';
import EditPassword from './pages/EditPassword';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit-username" element={<EditUsername />} />
        <Route path="/mypage/edit-email" element={<EditEmail />} />
        <Route path="/mypage/edit-password" element={<EditPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
