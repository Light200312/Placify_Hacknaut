import React, { useState } from 'react';
import useAiStore from '../store/aiStore.jsx';
import LoadingButton from './LoadingButton.jsx';

const AnalysisForm = ({ profileId }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [localError, setLocalError] = useState('');

  // Get state and actions from the Zustand store
  const isAnalyzing = useAiStore((state) => state.isAnalyzing);
  const analyzeJob = useAiStore((state) => state.analyzeJob);
  const clearAnalysisError = useAiStore((state) => state.clearAnalysisError);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearAnalysisError(); // Clear old errors
    
    if (!profileId) {
      setLocalError('Please save your profile first before analyzing.');
      return;
    }
    if (!jobDescription) {
        setLocalError('Please paste a job description to analyze.');
        return;
    }
    
    setLocalError('');
    analyzeJob(profileId, jobDescription);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. Analyze Job</h2>
      {/* - Removed 'flex' from the form
        - 'space-y-4' will now correctly space the label/input group and the error
      */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          
          {/* This new div creates the row layout for the input and button */}
          <div className="mt-1 flex items-start space-x-3">
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              // Increased rows for better UX, as job descriptions are long
              rows="3"
              className="mt-1 block w-full flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Paste the full job description here..."
              required
            />
            <LoadingButton
              isLoading={isAnalyzing}
              loadingText="Analyzing..."
              // - Removed 'w-full' to make button smaller
              // - Added 'flex-shrink-0' to prevent it from being squished
              // - Its height is fixed by its 'py-2' padding
              className="mt-1 shrink-0 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              Analyze
            </LoadingButton>
          </div>
        </div>

        {/* Error message now sits cleanly below the input group */}
        {localError && (
            <div className="text-sm text-red-600">
                {localError}
            </div>
        )}

        {/* The LoadingButton was moved up into the 'div' above */}
      </form>
    </div>
  );
};

export default AnalysisForm;