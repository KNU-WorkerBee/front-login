import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import EditUsername from './pages/EditUsername';
import EditEmail from './pages/EditEmail';
import Dashboard from './pages/Dashboard';
import NoteSummary from './pages/NoteSummary';
import Quiz from './pages/Quiz';
import EditProfilePage from './pages/EditProfilePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/EditUsername" element={<EditUsername />} />
          <Route path="/EditEmail" element={<EditEmail />} />
          <Route path="/summary" element={<NoteSummary />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
