// src/pages/CompanyDetailPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { companies } from '../data/companies';
import Header from '../components2/Home/Header';
import Footer from '../components2/Home/Footer';

function CompanyDetailPage() {
  const { companyName } = useParams();
  const company = companies.find((c) => c.id === companyName);

  if (!company) {
    return (
      <div>
        <Header />
        <div className="text-center mt-10 text-red-600 text-lg font-semibold">
          Company not found!
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6 text-center">
        {/* Company Logo */}
        {company.logo && (
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="mx-auto h-24 mb-6 object-contain"
          />
        )}

        {/* Header */}
        <h1 className="text-4xl font-bold my-4 text-gray-800">
          {company.name} Placement Preparation
        </h1>

        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Choose a round below to begin your preparation journey for{" "}
          <span className="font-semibold text-blue-600">{company.name}</span>.
        </p>

        {/* Rounds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {company.rounds.map((round) => (
            <Link
              key={round.id}
              to={`/company/${company.id}/${round.id}`}
              aria-label={`Go to ${round.name} of ${company.name}`}
              className="block group p-8 bg-linear-to-br from-blue-600 to-blue-500 text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <h2 className="text-2xl font-semibold mb-2 group-hover:underline">
                {round.name}
              </h2>
              <p className="text-sm text-blue-100">{round.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyDetailPage;
