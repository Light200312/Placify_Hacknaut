import React, { useState } from 'react';

const SuggestionCard = ({ type, data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (type === 'prompt') {
    return (
      <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">
            {data.targetedAI || 'AI Bot'}
          </span>
          <span className="text-gray-400 text-xs font-medium">Prompt</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{data.title}</h3>
        
        <div className="flex-grow">
            <p className="text-sm text-gray-600 mb-3"><span className="font-semibold">Aim:</span> {data.aim}</p>
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-3 relative group">
                <p className="text-sm text-gray-700 font-mono italic line-clamp-4 group-hover:line-clamp-none transition-all">
                    "{data.promptText}"
                </p>
                <button 
                    onClick={handleCopy}
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy Prompt"
                >
                    {copied ? '✅' : '📋'}
                </button>
            </div>

            <p className="text-xs text-gray-500">
                <span className="font-semibold text-green-600">Benefits:</span> {data.benefits}
            </p>
        </div>
      </div>
    );
  }

  // Website Card
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-3">
         <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
            {data.category || 'Tool'}
          </span>
         <span className="text-gray-400 text-xs font-medium">Website</span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
          {data.name}
          <a href={data.url} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-blue-600">
              ↗
          </a>
      </h3>
      <p className="text-sm text-blue-600 mb-3 truncate">{data.url}</p>
      
      <div className="flex-grow">
          <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">Purpose:</span> {data.purpose}</p>
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-green-600">Why use it:</span> {data.benefits}
          </p>
      </div>

      <a 
        href={data.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-4 w-full text-center py-2 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 font-semibold rounded-lg transition-colors text-sm"
      >
        Visit Website
      </a>
    </div>
  );
};

export default SuggestionCard;