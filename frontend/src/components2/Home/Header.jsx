import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-3xl font-black bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Placify
          </span>
          <span className="text-2xl">📍</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
      <Link to="/appraise" className="text-gray-700 hover:text-blue-600 font-semibold transition">
        ATS Analyzer
      </Link>
      <Link to="/analysejob" className="text-gray-700 hover:text-blue-600 font-semibold transition">
        Job Analysis
      </Link>
      <Link to="/jobposts" className="text-gray-700 hover:text-blue-600 font-semibold transition">
        Job Board
      </Link>
      <Link to="/collegehiring" className="text-gray-700 hover:text-blue-600 font-semibold transition">
        College Hiring
      </Link>
      <Link to="/suggestions" className="text-gray-700 hover:text-blue-600 font-semibold transition">
        Expert Suggestions
      </Link>
      <Link to="/uploadDB" className="text-gray-700 hover:text-blue-600 font-semibold transition">
        College DB Upload
      </Link>
      {/* suggestions */}
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-4 items-center">
          {token && user ? (
            <>
              <span className="text-gray-700 font-semibold hidden sm:inline">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 text-blue-600 font-bold hover:bg-blue-50 rounded-lg transition"
              >
                LogIn
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
