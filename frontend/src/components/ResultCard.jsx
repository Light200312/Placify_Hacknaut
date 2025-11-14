import React from 'react';
import DonutChart from './DonutChart.jsx';

/**
 * Renders the analysis result for a single AI model
 */
const ResultCard = ({ result }) => {
    if (result && result.error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 font-medium">Analysis Failed</p>
                <p className="text-red-600 text-sm">{result.error}</p>
            </div>
        );
    }
    
    if (!result) {
        return null;
    }

    const score = Math.round(result.finalChanceScore || 0);

    return (
        <div className="space-y-4">
            <div className="flex justify-center items-center">
                <DonutChart percentage={score} />
            </div>
            
            <div>
                <h4 className="font-semibold text-gray-700 mb-2">Matching Keywords</h4>
                <div className="flex flex-wrap gap-2">
                    {result.matchingKeywords?.length > 0
                        ? result.matchingKeywords.map((kw, i) => (
                            <span key={i} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{kw}</span>
                          ))
                        : <span className="text-gray-500 text-sm">None found.</span>
                    }
                </div>
            </div>
            
            <div>
                <h4 className="font-semibold text-gray-700 mb-2">Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                    {result.missingKeywords?.length > 0
                        ? result.missingKeywords.map((kw, i) => (
                            <span key={i} className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{kw}</span>
                          ))
                        : <span className="text-gray-500 text-sm">None found.</span>
                    }
                </div>
            </div>
            
            <div>
                <h4 className="font-semibold text-gray-700 mb-2">Suggestions</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                    {result.suggestions?.length > 0
                        ? result.suggestions.map((s, i) => <li key={i}>{s}</li>)
                        : <li>No suggestions provided.</li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default ResultCard;