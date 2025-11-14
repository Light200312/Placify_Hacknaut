import React, { useState } from 'react';
import ProfileForm from '../components/ProfileForm.jsx';
import AnalysisForm from '../components/AnalysisForm.jsx';
import ResultsDisplay from '../components/ResultsDisplay.jsx';
import PrepGuideForm from '../components/PrepGuideForm.jsx'; // New
import PrepGuideDisplay from '../components/PrepGuideDisplay.jsx'; // New

export default function HomePage() {
  // The profileId is needed by the AnalysisForm, so we lift state here.
  // ProfileForm will call onProfileSave to set this ID.
  const [profileId, setProfileId] = useState('');

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">AI-Powered Placement ATS</h1>
        <p className="text-lg text-gray-600">Analyze your profile, get company-specific prep guides.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Input Forms --- */}
        <div className="lg:col-span-1 space-y-8">
          <ProfileForm onProfileSave={setProfileId} />
          {/* <PrepGuideForm /> */}
        </div>
        
        {/* --- Right Column: Analysis Results --- */}
        <div className="lg:col-span-2 space-y-8">
          {/* <PrepGuideDisplay /> */}
          <AnalysisForm profileId={profileId} />

          <ResultsDisplay />
        </div>

      </div>
    </div>
  );
}