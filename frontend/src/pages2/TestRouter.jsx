import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import AptitudeTestPage from './AptitudeTestPage';
import TechnicalTestPage from './TechnicalTestPage';
import ReadingTestPage from './ReadingTestPage';

/**
 * TestRouter: Routes to the appropriate test page based on roundType
 * Maps round types (aptitude, technical, coding, communication, hr, etc.) to test components
 */
function TestRouter() {
  const { companyName, roundType } = useParams();

  // Map round types to test components
  const testComponentMap = {
    aptitude: <AptitudeTestPage />,
    technical: <TechnicalTestPage />,
    coding: <TechnicalTestPage />,
    technicalInterview: <TechnicalTestPage />,
    communication: <ReadingTestPage />,
    reading: <ReadingTestPage />,
    // Add more mappings as needed
  };

  // Return appropriate test component or HR/other round placeholder
  if (testComponentMap[roundType]) {
    return testComponentMap[roundType];
  }

  // For HR and other rounds, show a placeholder
  return (
    <div className="container mx-auto p-6 text-center">
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-yellow-800 mb-4">
          {roundType.charAt(0).toUpperCase() + roundType.slice(1)} Round
        </h1>
        <p className="text-yellow-700 text-lg">
          This round is coming soon! Currently, we have Aptitude, Technical, and Communication round tests available.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default TestRouter;
