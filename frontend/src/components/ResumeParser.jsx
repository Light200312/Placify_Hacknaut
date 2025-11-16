import React, { useState, useRef } from 'react'; // Added useRef
import useAiStore from '../store/aiStore.jsx';
import LoadingButton from './LoadingButton.jsx';

const ResumeParser = () => {
  const [file, setFile] = useState(null);
  const [localError, setLocalError] = useState('');
  const [isDragging, setIsDragging] = useState(false); // State to track drag-over
  const fileInputRef = useRef(null); // Ref to access the hidden file input

  // Get state and actions from the Zustand store
  const isParsing = useAiStore((state) => state.isParsing);
  const parseError = useAiStore((state) => state.parseError);
  const parseResume = useAiStore((state) => state.parseResume);

  /**
   * Processes the selected file (from drop or click)
   * and performs validation.
   */
  const processFile = (selectedFile) => {
    if (!selectedFile) return;

    const mimeType = selectedFile.type;

    // Check for valid file types
    if (mimeType !== 'application/pdf' && mimeType !== 'image/png' && mimeType !== 'image/jpeg') {
      setLocalError('Invalid file type. Please use PDF, PNG, or JPG.');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Clear the hidden input
      }
    } else {
      setFile(selectedFile);
      setLocalError('');
    }
  };

  // Handles file selection from the hidden input (e.g., when drop zone is clicked)
  const handleFileChange = (e) => {
    processFile(e.target.files[0]);
  };

  // Triggers the hidden file input when the drop zone is clicked
  const handleZoneClick = () => {
    fileInputRef.current.click();
  };

  // --- Drag and Drop Handlers ---

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent browser from opening the file
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Prevent browser from opening the file
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]); // Get the first dropped file
  };

  // --- Parse Handler ---

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
      <label className="block text-sm font-medium text-gray-700">Auto-fill from Resume</label>
      <p className="text-xs text-gray-500 mb-2">Drag & drop or click to upload (PDF, PNG, JPG).</p>
      
      {/* Hidden file input */}
      <input
        type="file"
        id="resumeFile"
        name="resumeFile"
        onChange={handleFileChange}
        className="hidden" // Hide the default input
        accept=".pdf,image/png,image/jpeg"
        ref={fileInputRef}
      />

      {/* --- Drop Zone --- */}
      <div
        onClick={handleZoneClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col justify-center items-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:border-gray-400'}
        `}
      >
        <div className="text-center">
          {/* SVG Icon (optional, but good for UX) */}
          <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          {/* Show file name or prompt */}
          {file ? (
            <p className="mt-2 text-sm text-gray-700">
              Selected: <span className="font-semibold">{file.name}</span>
            </p>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </p>
          )}
        </div>
      </div>

      <LoadingButton
        type="button"
        onClick={handleParse}
        isLoading={isParsing}
        loadingText="Parsing..."
        className="w-full flex justify-center py-2 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={!file || isParsing} // Disable button if no file is selected
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