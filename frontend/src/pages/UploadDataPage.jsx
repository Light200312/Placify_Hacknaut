// You need to install axios if you haven't already
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components2/Home/Header'; // Adjust path as needed
import Footer from '../components2/Home/Footer'; // Adjust path as needed
import { useAuth } from '../context/AuthContext';

// This is the structured schema guide for the user
const schemaExample = `// Structure for custom questions database upload
{
  "rounds": [
    {
      "roundName": "Aptitude Round",
      "roundType": "aptitude", // Must be 'aptitude', 'technical', or 'communication'
      "questions": [
        {
          "qId": "apt1",
          "questionText": "A train passes a 120m platform in 10s. What is its speed?",
          "options": ["10 m/s", "12 m/s", "15 m/s", "20 m/s"],
          "correctAnswer": "12 m/s",
          "explanation": "Speed = Distance/Time = 120/10 = 12 m/s.",
          "type": "quantitative"
        },
        {
          "qId": "tech1",
          "questionText": "Write a function to reverse a string in-place.",
          "options": [], // Leave empty for coding questions
          "correctAnswer": "function reverse(s) { ... }",
          "explanation": "Use a two-pointer approach...",
          "type": "technical"
        }
      ]
    }
  ]
}`;

const UploadDataPage = () => {
  const [collegeName, setCollegeName] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isDragActive, setIsDragActive] = useState(false); // New state for visual feedback
  const { user } = useAuth();

  // Check if user is authorized
  const ALLOWED_EMAIL = 'roshan20031112@gmail.com';
  const isAuthorized = user?.email === ALLOWED_EMAIL;

  const handleFileChange = (e) => {
    // We only accept PDF for the AI Vision pipeline
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setMessage({ text: '', isError: false });
    } else {
      setFile(null);
      setMessage({ text: 'Please select a valid PDF file.', isError: true });
    }
  };

  // --- **** START: DRAG AND DROP HANDLERS **** ---

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setMessage({ text: '', isError: false });
      } else {
        setMessage({ text: 'Only PDF files are supported for parsing.', isError: true });
      }
      e.dataTransfer.clearData();
    }
  };
  
  // --- **** END: DRAG AND DROP HANDLERS **** ---


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !collegeName) {
      setMessage({ text: 'Please enter a college name and select a PDF file.', isError: true });
      return;
    }

    setLoading(true);
    setMessage({ text: '', isError: false });

    const formData = new FormData();
    formData.append('collegeName', collegeName);
    formData.append('dataFile', file); // 'dataFile' must match backend route definition

    try {
      const response = await axios.post('http://localhost:5000/api/colleges/upload-data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({ text: response.data.message, isError: false });
      setFile(null); // Clear file input
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'An unknown error occurred.';
      setMessage({ text: errorMsg, isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto max-w-4xl p-6">
        <div className="bg-white rounded-lg shadow-xl p-8">
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Upload Placement Data</h1>
          
          {/* Authorization Check */}
          {!isAuthorized && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-600 text-red-700 rounded-lg">
              <p className="font-semibold">❌ Access Denied</p>
              <p className="text-sm mt-1">You are not authorized to upload data. Only the admin account can upload placement data.</p>
              <p className="text-sm mt-2 text-red-600">Current Email: <span className="font-mono font-bold">{user?.email || 'Not logged in'}</span></p>
            </div>
          )}
          
          <p className="text-gray-600 mb-6">
            Upload a **clean, structured PDF** containing your college's placement questions. Our AI will parse and save them to your custom database.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* College Name */}
            <div>
              <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">
                College Name
              </label>
              <input
                type="text"
                id="collegeName"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                disabled={!isAuthorized}
                className={`mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${!isAuthorized ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                placeholder="e.g., IIT Bombay"
                required
              />
              <p className="text-xs text-gray-500 mt-1">This must *exactly* match the name students will search for.</p>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Questions PDF
              </label>

              {/* --- **** START: DRAG AND DROP AREA W/ HANDLERS **** --- */}
              <div 
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 rounded-md ${
                  isDragActive && isAuthorized ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                } border-dashed transition-colors ${!isAuthorized ? 'bg-gray-100 opacity-60 cursor-not-allowed' : ''}`}
                onDragOver={isAuthorized ? handleDragOver : undefined}
                onDragLeave={isAuthorized ? handleDragLeave : undefined}
                onDrop={isAuthorized ? handleDrop : undefined}
              >
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                      <span>Upload a PDF file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">{file ? file.name : 'PDF up to 10MB'}</p>
                </div>
              </div>
              {/* --- **** END: DRAG AND DROP AREA W/ HANDLERS **** --- */}

            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading || !isAuthorized}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none"
              >
                {!isAuthorized ? 'Access Denied' : loading ? 'Parsing & Saving...' : 'Upload and Process File'}
              </button>
            </div>            {/* Message Area */}
            {message.text && (
              <div className={`p-3 rounded-md text-center ${message.isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {message.text}
              </div>
            )}
          </form>

          {/* Schema Guide */}
          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">Data Schema Guide (For Best Results)</h3>
            <p className="text-sm text-gray-600 mt-2 mb-4">
              For the AI to correctly parse your PDF, ensure questions are clearly numbered and answers are formatted directly below options. The AI will convert your text into the following JSON structure:
            </p>
            <pre className="bg-gray-900 text-green-300 p-4 rounded-md text-xs overflow-x-auto">
              {schemaExample}
            </pre>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadDataPage;