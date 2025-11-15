import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function CodeCompiler({ code, language }) {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');

  const languageMap = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
    c: 50,
  };

  const executeCode = async () => {
    setLoading(true);
    setError('');
    setOutput('Running...');

    try {
      const response = await fetch(`${API_URL}/compiler/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          languageId: languageMap[language] || 63,
          input,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.output || 'Program executed successfully (no output)');
      } else {
        setError(data.message || 'Compilation failed');
        setOutput('');
      }
    } catch (err) {
      setError('Failed to execute code. Make sure the backend server is running.');
      setOutput('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg p-4 space-y-3">
      {/* Input Section */}
      <div>
        <label className="block text-sm font-semibold mb-2">Input (Optional)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input here..."
          className="w-full h-20 bg-gray-800 border border-gray-700 rounded p-2 text-sm font-mono"
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
        <div className="bg-gray-800 border border-gray-700 rounded p-3 h-32 overflow-auto text-sm font-mono">
          {error ? (
            <span className="text-red-400">{error}</span>
          ) : (
            <span className="text-green-400">{output}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeCompiler;
