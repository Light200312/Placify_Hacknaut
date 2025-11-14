import React, { useState } from 'react';
import useAiStore from '../store/aiStore.jsx';
import LoadingButton from './LoadingButton.jsx';

const ResumeParser = () => {
  const [file, setFile] = useState(null);
  const [localError, setLocalError] = useState('');
  
  // Get state and actions from the Zustand store
  // FIX: Select state values individually to prevent infinite loops.
  const isParsing = useAiStore((state) => state.isParsing);
  const parseError = useAiStore((state) => state.parseError);
  const parseResume = useAiStore((state) => state.parseResume);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const mimeType = selectedFile.type;

      // Check for valid file types
      if (mimeType !== 'application/pdf' && mimeType !== 'image/png' && mimeType !== 'image/jpeg') {
        setLocalError('Invalid file type. Please use PDF, PNG, or JPG.');
        setFile(null);
        e.target.value = null; // Clear the input
      } else {
        setFile(selectedFile);
        setLocalError('');
      }
    }
  };

  const handleParse = () => {
    if (!file) {
      setLocalError('Please select a file first.');
      return;
    }
    setLocalError('');
    parseResume(file);
  };

  // Show local errors first, then server errors
  const errorMessage = localError || parseError;

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <label htmlFor="resumeFile" className="block text-sm font-medium text-gray-700">Auto-fill from Resume</label>
      <p className="text-xs text-gray-500 mb-2">Upload an image (PNG, JPG) or PDF.</p>
      <input
        type="file"
        id="resumeFile"
        name="resumeFile"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        accept=".pdf,image/png,image/jpeg"
      />
      <LoadingButton
        type="button" // Important: Don't submit the form
        onClick={handleParse}
        isLoading={isParsing}
        loadingText="Parsing..."
        className="w-full flex justify-center py-2 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        Parse Resume
      </LoadingButton>
      {errorMessage && (
        <div className="text-sm text-center mt-2 text-red-600">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ResumeParser;