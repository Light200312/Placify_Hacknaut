import React, { useState } from 'react';
import useAiStore from '../store/aiStore';
import LoadingButton from './LoadingButton';

const PrepGuideForm = () => {
  const [company, setCompany] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [localError, setLocalError] = useState('');

  // Get state and actions from the Zustand store
  const isFetchingPrepGuide = useAiStore((state) => state.isFetchingPrepGuide);
  const fetchPrepGuide = useAiStore((state) => state.fetchPrepGuide);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (!company || !jobRole) {
      setLocalError('Please enter both a company and a job role.');
      return;
    }
    
    fetchPrepGuide(company, jobRole);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Get Company Prep Guide</h2>
      <p className="text-sm text-gray-600 mb-4">Uses Google Search to find the latest hiring process & prep links.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="e.g., Tata Consultancy Services"
            required
          />
        </div>
        <div>
          <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700">Job Role</label>
          <input
            type="text"
            id="jobRole"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="e.g., Graduate Engineer Trainee"
            required
          />
        </div>
        {localError && (
          <div className="text-sm text-red-600">
            {localError}
          </div>
        )}
        <LoadingButton
          isLoading={isFetchingPrepGuide}
          loadingText="Searching..."
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Get Prep Guide
        </LoadingButton>
      </form>
    </div>
  );
};

export default PrepGuideForm;