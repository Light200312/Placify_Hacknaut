import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Make sure this matches your setup

// --- Helper Functions (no changes) ---
/** Parse strings like "45 Questions" → 45 */
const parseQuestionCount = (str) => {
  if (!str) return 5;
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : 5;
};

/** Parse duration like "60 min" → seconds */
const parseDurationToSeconds = (str) => {
  if (!str) return null;
  const match = str.match(/(\d+)/); 
  if (match && match[1]) {
    const minutes = parseInt(match[1], 10);
    return minutes * 60; // Convert to seconds
  }
  return null; 
};

// ----------------------------------------------------------------------
// **** Aptitude View Component (Interactive MCQs) ****
// ----------------------------------------------------------------------
const AptitudeView = ({ questions, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    if (showAnswer) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;
    setShowAnswer(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setStats(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setStats(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      alert(`Test finished! You scored ${stats.correct} / ${stats.total}`);
      onClose(); // Close the modal on finish
    }
  };

  return (
    <div className="p-1 md:p-4">
      {/* Progress */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-semibold text-gray-700">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <p className="text-sm font-bold text-gray-700">
          Score: {stats.correct} / {stats.total}
        </p>
      </div>

      {/* Question */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <p className="text-sm font-semibold text-blue-600 mb-2">{currentQuestion.title}</p>
        <p className="text-lg font-medium text-gray-800">{currentQuestion.questionText}</p>
      </div>
      
      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => {
          let optionClass = "border-gray-300 hover:bg-gray-100";
          if (showAnswer) {
            if (option === currentQuestion.correctAnswer) {
              optionClass = "bg-green-100 border-green-500 ring-2 ring-green-300";
            } else if (option === selectedOption) {
              optionClass = "bg-red-100 border-red-500 ring-2 ring-red-300";
            } else {
              optionClass = "border-gray-300 opacity-60";
            }
          } else if (option === selectedOption) {
            optionClass = "bg-blue-100 border-blue-500 ring-2 ring-blue-300";
          }
          
          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              disabled={showAnswer}
              className={`block w-full text-left p-4 rounded-lg border-2 transition-all ${optionClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showAnswer && (
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg mb-4">
          <p className="font-bold text-gray-800">Explanation:</p>
          <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={showAnswer ? handleNextQuestion : handleSubmitAnswer}
        disabled={!selectedOption}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
      >
        {showAnswer ? (currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Test') : 'Submit Answer'}
      </button>
    </div>
  );
};

// ----------------------------------------------------------------------
// **** Coding View Component (Uses the required design from the image) ****
// ----------------------------------------------------------------------
const CodingView = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const currentQuestion = questions[currentQuestionIndex];

  const handleQuestionComplete = () => {
    setCompletedQuestions(new Set(completedQuestions).add(currentQuestionIndex));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Practice finished! You've reviewed all coding questions.");
    }
  };

  return (
    <div className="p-1 md:p-4">
      {/* Progress Bar (0/3) */}
      <div className="mb-4">
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span>Progress</span>
          <span>{completedQuestions.size}/{questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.round((completedQuestions.size / questions.length) * 100)}%` }}
          />
        </div>
      </div>

      {/* Question Display (The main card body) */}
      <div className="bg-white p-6 rounded-lg mb-6 border border-gray-200">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">{currentQuestion.title}</h3>
        
        <div className="flex justify-between items-center mb-4 text-sm">
          <span className={`inline-block px-3 py-1 rounded-full font-semibold ${
            currentQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            currentQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {currentQuestion.difficulty}
          </span>
          <span className="text-gray-600">
            {currentQuestion.acRate?.toFixed(1) || 'N/A'}% Acceptance
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm font-semibold text-gray-700">Topics: <span className="font-normal">{currentQuestion.topicTags?.join(', ') || 'N/A'}</span></p>
          <p className="text-base text-gray-800">{currentQuestion.description || "See LeetCode for full problem description."}</p>
        </div>
      </div>

      {/* Action Buttons (The core change from the image) */}
      <div className="flex gap-4">
        <a
          href={currentQuestion.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-center"
        >
          📖 Open on LeetCode
        </a>
        <button
          onClick={handleQuestionComplete}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg"
        >
          ✓ Mark as Done
        </button>
      </div>

      {/* Question Navigation */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">Questions:</p>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestionIndex(idx)}
              className={`w-8 h-8 rounded-full font-semibold text-sm ${
                idx === currentQuestionIndex
                  ? 'bg-blue-600 text-white'
                  : completedQuestions.has(idx)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


// ----------------------------------------------------------------------
// **** Main PracticeTest Component (Smart Modal Shell) ****
// ----------------------------------------------------------------------
const PracticeTest = ({ company, round, numQuestions, onClose, timeLimit }) => {
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);

  // Fetch questions
  useEffect(() => {
    fetchQuestions(numQuestions); 
  }, [company, round, numQuestions]);

  // Timer
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && testStarted) {
      handleTestEnd();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, testStarted]);

  const fetchQuestions = async (countString) => { 
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/api/leetcode/questions`, { // This route leads to practiceController
        params: { company, round, count: countString }
      });

      if (!res.data?.problems?.length) {
        setError('No questions returned from API');
        return;
      }

      const allProblems = res.data.problems;
      setQuestions(allProblems);
      // setSource(res.data.source); // Assuming source is already managed or not critical for this view

      // --- **** KEY LOGIC: Detect question type **** ---
      // If the first question has an 'options' array, it's an MCQ test.
      if (allProblems[0].options && allProblems[0].options.length > 0) {
        setQuestionType('Aptitude');
      } else {
        // Otherwise, it's a coding (LeetCode-style) test.
        setQuestionType('Coding');
      }
      // --- **** END KEY LOGIC **** ---

      // TIMER LOGIC
      const durationSeconds = parseDurationToSeconds(timeLimit);
      if (durationSeconds) {
        setTimeLeft(durationSeconds);
        setEstimatedTime({ formatted: timeLimit }); 
      } else if (res.data.estimatedTime) {
        setEstimatedTime(res.data.estimatedTime);
        setTimeLeft(res.data.estimatedTime.minutes * 60);
      } else {
        const parsedCount = parseQuestionCount(countString);
        const defaultMinutes = parsedCount * 2; 
        setEstimatedTime({ minutes: defaultMinutes, formatted: `${defaultMinutes} minutes` });
        setTimeLeft(defaultMinutes * 60);
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = () => {
    setTestStarted(true);
    setIsRunning(true);
  };
  const handleTestEnd = () => {
    setIsRunning(false);
    alert(`⏰ Time's up!`);
    onClose();
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- RENDER LOGIC ---

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <p className="text-xl">Loading questions for {company} - {round}...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-8 rounded-lg max-w-md text-center">
          <p className="text-xl text-red-600 font-bold mb-4">⚠️ Error Loading Questions</p>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-8 rounded-lg max-w-2xl w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">Practice Session</h2>
          <div className="space-y-4 mb-6">
            <p className="text-gray-700"><strong>Company:</strong> {company}</p>
            <p className="text-gray-700"><strong>Round:</strong> {round}</p>
            <p className="text-gray-700"><strong>Questions:</strong> {questions.length || 0}</p>
            <p className="text-gray-700">
              <strong>Time Limit:</strong> {timeLimit ? timeLimit : (estimatedTime?.formatted || 'Calculating...')}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">
              💡 You'll have {timeLimit ? timeLimit : (estimatedTime?.formatted || 'the estimated time')} to solve all {questions.length || 0} questions.
              {/* Conditional text for coding */}
              {questionType === 'Coding' && " This is a practice review. Complete the solution on the external LeetCode link."}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleStartTest}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg"
            >
              🚀 Start Practice Session
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg"
            >
              ✕ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE TEST UI
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold">{company} - {round}</h2>
            <p className="text-gray-600">
              {questionType === 'Aptitude' ? 'Multiple Choice Questions' : 'Coding Practice'}
            </p>
          </div>
          <div className={`text-4xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-green-600'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Main Content (Scrollable) */}
        {/* Added negative margin to the inner scroll area to align with modal padding */}
        <div className="overflow-y-auto flex-grow mb-4 -mx-6 px-6"> 
          {/* Render the correct component based on the question type */}
          {questionType === 'Aptitude' && <AptitudeView questions={questions} onClose={onClose} />}
          {questionType === 'Coding' && <CodingView questions={questions} />}
        </div>
        
        {/* Exit */}
        <button
          onClick={() => {
            if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
              onClose();
            }
          }}
          className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded-lg flex-shrink-0"
        >
          ✕ Exit Practice
        </button>
      </div>
    </div>
  );
};

export default PracticeTest;