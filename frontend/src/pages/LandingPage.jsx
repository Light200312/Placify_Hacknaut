import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import HomePage from '../pages2/HomePage';
import CompanyDetailPage from '../pages2/CompanyDetailPage';
import AptitudeTestPage from '../pages2/AptitudeTestPage';
import TechnicalTestPage from '../pages2/TechnicalTestPage';
import ReadingTestPage from '../pages2/ReadingTestPage';
import ResultPage from '../pages2/ResultPage';
import BlogPage from '../pages2/BlogPage';
import BlogDetailPage from '../pages2/BlogDetailPage';
import ContactPage from '../pages2/ContactPage';
import LoginPage from '../pages2/Auth/LoginPage';
import SignupPage from '../pages2/Auth/SignupPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Protected Routes */}
      <Route path="/company/:companyName" element={<ProtectedRoute><CompanyDetailPage /></ProtectedRoute>} />
      <Route path="/company/:companyName/aptitude" element={<ProtectedRoute><AptitudeTestPage /></ProtectedRoute>} />
      <Route path="/company/:companyName/technical" element={<ProtectedRoute><TechnicalTestPage /></ProtectedRoute>} />
      <Route path="/company/:companyName/communication" element={<ProtectedRoute><ReadingTestPage /></ProtectedRoute>} />
      <Route path="/results/:companyName/:roundType" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />

      <Route path="*" element={<div className="text-center mt-10 text-red-600 text-xl">404 Not Found</div>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
