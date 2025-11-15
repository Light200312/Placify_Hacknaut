import React from 'react';
import { useNavigate } from 'react-router-dom';

function CTASection() {
  const navigate = useNavigate();

  return (
    <div className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-6 text-center">
        {/* Main CTA */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Crack Your Dream Company? 🎯
        </h2>

        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
          Join thousands of successful students who've already started their preparation journey. Your dream job is just one click away!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/#companies')}
            className="px-10 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Preparing Now 🚀
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-blue-500 transition-all">
            Explore Resources →
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-blue-100 mt-10">
          No credit card required • Free access • Lifetime updates
        </p>
      </div>
    </div>
  );
}

export default CTASection;
