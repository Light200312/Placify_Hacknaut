import React from "react";
import HomePage from "./pages/HomePage.jsx";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import JobAnalyzer from "./pages/JobAnalyzer.jsx";
import JobPost from "./pages/JobPosts.jsx";
export default function App() {
  return (
    <div
      className="bg-gray-100 text-gray-900 min-h-screen p-4 md:p-8"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
       <nav className="flex w-full items-center justify-between rounded-lg bg-gray-900 p-4 mb-8 text-white">
      
      {/* 1. Brand/Logo Section */}
      <div>
        <Link 
          to="/" 
          // - Removed mb-4, as it can break vertical alignment in a navbar
          // - Added transition and a hover effect for the brand
          className="text-2xl font-bold text-white transition-colors duration-200 hover:text-indigo-400"
        >
          Hacknaut
        </Link>
      </div>

      {/* 2. Navigation Links Section */}
      {/* - This div groups the links
        - Removed 'w-full' and 'justify-content-between'
        - Added 'space-x-6' to create consistent spacing between links
      */}
      <div className="flex items-center space-x-6">
        <Link 
          to="/appraise" 
          
          className="font-medium text-gray-300 transition-colors duration-200 hover:text-indigo-400"
        >
          Skill Appraisal
        </Link>
        <Link 
          to="/analysejob" 
          className="font-medium text-gray-300 transition-colors duration-200 hover:text-indigo-400"
        >
          Company Analyser
        </Link>
         <Link 
          to="/jobposts" 
          className="font-medium text-gray-300 transition-colors duration-200 hover:text-indigo-400"
        >
          Job Posts
        </Link>
      </div>
    </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/appraise" element={<HomePage />} />
        <Route path="/analysejob" element={<JobAnalyzer />} />
        <Route path="/jobposts" element={<JobPost />} />
      </Routes>
    </div>
  );
}
