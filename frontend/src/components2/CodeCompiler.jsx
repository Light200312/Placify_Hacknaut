import React, { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Moved the map OUTSIDE the component
const JDOODLE_LANGUAGE_MAP = {
  javascript: {
    language: 'nodejs',
    versionIndex: '4' // Node.js 18.15.0
  },
  python: {
    language: 'python3',
    versionIndex: '4' // Python 3.11.2
  },
  java: {
    language: 'java',
    versionIndex: '4' // JDK 17.0.6
  },
  cpp: {
    language: 'cpp17',
    versionIndex: '1' // g++ 12.2.0
  },
  c: {
    language: 'c',
    versionIndex: '5' // gcc 12.2.0
  }
};

// --- MODIFIED ---
// Removed executeSignal from props
function CodeCompiler({ code, language }) {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');

  const executeCode = useCallback(async () => {
    if (!code || code.trim() === '') {
      setError('Please write some code first'); // Show error if no code
      setOutput('');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('Executing code...');

    try {
      const langDetails = JDOODLE_LANGUAGE_MAP[language];
      if (!langDetails) {
         setError(`Language '${language}' is not supported.`);
         setOutput('');
         setLoading(false);
         return;
      }
      
      const response = await fetch(`${API_URL}/v1/compile/execute`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          code,
          language, 
          input: input || '',
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        setError('Quota Exceeded');
        setOutput(data.message || 'You have exceeded the compiler quota.');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError(data.message || 'Compilation failed. Server error.');
        setOutput(data.error || '');
        setLoading(false);
        return;
      }

      if (data.statusCode === 200) {
        setOutput(data.output || 'Program executed successfully (no output)');
        setError('');
      } else {
        setError('Error');
        setOutput(data.output || 'An unknown error occurred.');
      }

    } catch (err) {
      console.error('Network error:', err);
      setError('Network Error: Failed to execute code. Make sure the backend server is running.');
      setOutput('');
    } finally {
      setLoading(false);
    }
  }, [code, language, input]); 


  // --- REMOVED ---
  // The useEffect that watched for executeSignal is gone.

  return (
    <div className="bg-gray-900 text-white rounded-lg p-4 space-y-3">
      {/* Input Section */}
      <div>
        <label className="block text-sm font-semibold mb-2">Input (Optional)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input here..."
          className="w-full h-20 bg-gray-800 border border-gray-700 rounded p-2 text-sm font-mono resize-none"
        />
      </div>

      {/* Run Button */}
      <button
        onClick={executeCode}
        disabled={loading}
        className="w-full py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 font-semibold rounded transition"
      >
        {loading ? 'Executing...' : '▶ Run Code'}
      </button>

      {/* Output Section */}
      <div>
        <label className="block text-sm font-semibold mb-2">Output</label>
        <div className="bg-gray-800 border border-gray-700 rounded p-3 h-32 overflow-auto text-sm font-mono whitespace-pre-wrap break-words">
          {error ? (
            <>
              <div className="text-red-400 font-semibold mb-2">{error}</div>
              <div className="text-gray-300">{output}</div>
            </>
          ) : (
            <span className="text-green-400">{output || 'Output will appear here...'}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeCompiler;