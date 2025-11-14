import React from 'react';
import useAiStore from '../store/aiStore.jsx';
import Loader from './Loader.jsx';
import ResultCard from './ResultCard.jsx';

const ResultsDisplay = () => {
  // Get all results data from the Zustand store
  // FIX: Select state values individually to prevent infinite loops.
  const isAnalyzing = useAiStore((state) => state.isAnalyzing);
  const results = useAiStore((state) => state.results);
  const analysisError = useAiStore((state) => state.analysisError);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-[500px]">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. AI Analysis Results</h2>
      
      {isAnalyzing && <Loader />}
      
      {analysisError && (
        <div className="text-center py-20">
          <p className="text-lg text-red-600">Error: {analysisError}</p>
        </div>
      )}
      
      {!isAnalyzing && !analysisError && !results && (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500">Results will appear here once you save your profile and analyze a job.</p>
        </div>
      )}

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 space-y-4">
            <h3 className="text-xl font-semibold text-center text-blue-600">Gemini Analysis</h3>
            <ResultCard result={results.geminiResult} />
          </div>
          <div className="border border-gray-200 rounded-lg p-4 space-y-4">
            <h3 className="text-xl font-semibold text-center text-purple-600">OpenRouter (Mixtral 8x22b)</h3>
            <ResultCard result={results.openRouterResult} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;