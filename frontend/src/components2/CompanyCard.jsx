import React from 'react';
import { Link } from 'react-router-dom';

function CompanyCard({ company }) {
  return (
    <Link to={`/company/${company.id}`} className="card-link">
      <div className="company-card">
        {company.logo && (
          <img
            src={company.logo} // logo should be like '/tcs.png' if in public folder
            alt={`${company.name} logo`}
            className="company-logo"
          />
        )}
        <h2 className="company-name">{company.name}</h2>
        <p className="company-rounds">{company.rounds.length} Rounds of preparation</p>
      </div>
    </Link>
  );
}

export default CompanyCard;
