import React from 'react';

function Question({ question, selectedAnswer, onAnswerChange }) {
  return (
    <div className="mb-6">
      <p className="text-xl font-medium mb-4 text-gray-800">{question.question}</p>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <label key={index} className="flex items-center cursor-pointer bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors">
            <input
              type="radio"
              name={question.id}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerChange(question.id, option)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-3 text-lg text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Question;
