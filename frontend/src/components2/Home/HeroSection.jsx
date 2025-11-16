import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-linear-to-r from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 text-white py-24 overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 dark:bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-6 z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Master Your <span className="text-blue-200">Dream Company</span> Interviews
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Prepare for placements with curated content for Aptitude, Technical, Communication, and HR rounds.
            Join thousands of students who cracked their dream companies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => navigate('/#companies')}
              className="px-8 py-4 bg-white text-blue-700 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Preparation 🚀
            </button>
            <button
              className="px-8 py-4 bg-blue-500 text-white rounded-lg font-bold text-lg border-2 border-white hover:bg-blue-600 transition-all"
            >
              Learn More →
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 text-center">
            <div>
              <h3 className="text-3xl font-bold text-blue-200">50+</h3>
              <p className="text-blue-100">Companies</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-200">500+</h3>
              <p className="text-blue-100">Questions</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-200">10K+</h3>
              <p className="text-blue-100">Students</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
