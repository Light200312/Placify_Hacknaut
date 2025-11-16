import React from 'react';

/**
 * QuestionCard Component
 * Displays a single LeetCode question in a compact format
 * Used in lists/grids of questions
 */
const QuestionCard = ({ question, onSelect, isSelected, index }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={() => onSelect && onSelect(index)}
      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-blue-600 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-blue-300'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900 flex-1 pr-2">{question.title}</h4>
        <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
        <span>📊 {question.acRate?.toFixed(1) || 'N/A'}% acceptance</span>
        {question.isPremium && <span className="text-yellow-600">⭐ Premium</span>}
      </div>

      {question.topicTags && question.topicTags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {question.topicTags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
          {question.topicTags.length > 3 && (
            <span className="text-gray-600 text-xs px-2 py-0.5">+{question.topicTags.length - 3}</span>
          )}
        </div>
      )}

      <div className="mt-3 pt-3 border-t">
        <a
          href={question.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-blue-600 text-sm hover:underline font-medium"
        >
          Open on LeetCode →
        </a>
      </div>
    </div>
  );
};

export default QuestionCard;
