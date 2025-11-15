import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages2 (New structure)
import HomePage from './pages2/HomePage';
import CompanyDetailPage from './pages2/CompanyDetailPage';
import TestRouter from './pages2/TestRouter';
import ResultPage from './pages2/ResultPage';
import BlogPage from './pages2/BlogPage';
import BlogDetailPage from './pages2/BlogDetailPage';
import ContactPage from './pages2/ContactPage';
import LoginPage from './pages2/Auth/LoginPage';
import SignupPage from './pages2/Auth/SignupPage';

// Old pages (for compatibility)
import OldHomePage from './pages/HomePage.jsx';
import JobAnalyzer from './pages/JobAnalyzer.jsx';
import JobPost from './pages/JobPosts.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Main Landing Page */}
      <Route path="/" element={<HomePage />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Public Routes */}
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Company Preparation Routes (Protected) */}
      <Route path="/company/:companyName" element={<ProtectedRoute><CompanyDetailPage /></ProtectedRoute>} />
      
      {/* Dynamic Test Route - handles all test types (aptitude, technical, communication, etc) */}
      <Route path="/company/:companyName/:roundType" element={<ProtectedRoute><TestRouter /></ProtectedRoute>} />
      
      {/* Results Route (Protected) */}
      <Route path="/results/:companyName/:roundType" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
      
      {/* Old Routes (for backward compatibility) */}
      <Route path="/appraise" element={<OldHomePage />} />
      <Route path="/analysejob" element={<JobAnalyzer />} />
      <Route path="/jobposts" element={<JobPost />} />

      {/* 404 Not Found */}
      <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center text-red-600 text-2xl font-bold">404 - Page Not Found</div></div>} />
    </Routes>
  );
}

export default App;
