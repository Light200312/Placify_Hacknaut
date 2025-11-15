import React, { useState } from 'react';
import Header from '../components2/Home/Header';
import Footer from '../components2/Home/Footer';
import ProfileForm from '../components/ProfileForm.jsx';
import AnalysisForm from '../components/AnalysisForm.jsx';
import ResultsDisplay from '../components/ResultsDisplay.jsx';
import PrepGuideForm from '../components/PrepGuideForm.jsx'; // New
import PrepGuideDisplay from '../components/PrepGuideDisplay.jsx'; // New

export default function JobAnalyzer() {
  // The profileId is needed by the AnalysisForm, so we lift state here.
  // ProfileForm will call onProfileSave to set this ID.
  const [profileId, setProfileId] = useState('');

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">AI-Powered Placement Guide</h1>
          <p className="text-lg text-gray-600">Get company-specific prep guides.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Input Forms --- */}
        <div className="lg:col-span-1 space-y-8">
          {/* <ProfileForm onProfileSave={setProfileId} /> */}
          {/* <AnalysisForm profileId={profileId} /> */}
          <PrepGuideForm />
        </div>
        
        {/* --- Right Column: Analysis Results --- */}
        <div className="lg:col-span-2 space-y-8">
          <PrepGuideDisplay />
          {/* <ResultsDisplay /> */}
        </div>

      </div>
      </div>
      <Footer />
    </div>
  );
}