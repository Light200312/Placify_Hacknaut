import React from 'react';
import { useNavigate } from 'react-router-dom';
import { companies } from '../../data/companies';

function FeaturedCompanies() {
  const navigate = useNavigate();
  const featuredCompanies = companies.slice(0, 6);

  return (
    <div id="companies" className="py-20 bg-gray-50 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900  mb-4">
            Prepare for Top Companies 🏢
          </h2>
          <p className="text-lg text-gray-600  max-w-2xl mx-auto">
            Practice with curated questions from your dream companies. Choose your target company and start your preparation journey.
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/company/${company.id}`)}
            >
              {/* Company Header */}
              <div className="h-32 bg-linear-to-br  flex items-center justify-center p-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-32 w-auto object-contain"
                />
              </div>

              {/* Company Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold  text-black  mb-2">
                  {company.name}
                </h3>

                {/* Rounds Preview */}
                <div className="space-y-2 mb-6">
                  {company.rounds.slice(0, 3).map((round, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-900 dark:text-gray-400"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {round.name}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">
                  Start Practice →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-10 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-all">
            View All {companies.length} Companies
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCompanies;
