import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

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
  return match ? parseInt(match[1], 10) * 60 : null;
};

const PracticeTest = ({ company, round, numQuestions, onClose, timeLimit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [source, setSource] = useState('leetcode');
  const [estimatedTime, setEstimatedTime] = useState(null);

  // Fetch questions
  useEffect(() => {
    fetchQuestions(numQuestions);
  }, [company, round, numQuestions]);

  // Timer
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && testStarted) {
      handleTestEnd();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, testStarted]);

  const fetchQuestions = async (countString) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${API_URL}/api/leetcode/questions`, {
        params: { company, round, count: countString }
      });

      if (!res.data?.problems?.length) {
        setError('No questions returned from API');
        return;
      }

      setQuestions(res.data.problems);
      setSource(res.data.source);

      // TIMER LOGIC
      const durationSeconds = parseDurationToSeconds(timeLimit);

      if (durationSeconds) {
        setTimeLeft(durationSeconds);
        setEstimatedTime({ formatted: timeLimit });
      } else if (res.data.estimatedTime) {
        setEstimatedTime(res.data.estimatedTime);
        const minutes = res.data.estimatedTime.minutes || 90;
        setTimeLeft(minutes * 60);
      } else {
        const parsed = parseQuestionCount(countString);
        const fallbackMinutes = parsed * 2;
        setEstimatedTime({ minutes: fallbackMinutes, formatted: `${fallbackMinutes} minutes` });
        setTimeLeft(fallbackMinutes * 60);
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
    alert(`⏰ Time's up! You completed ${completedQuestions.size}/${questions.length} questions.`);
  };

  const handleQuestionComplete = () => {
    const newCompleted = new Set(completedQuestions);
    newCompleted.add(currentQuestionIndex);
    setCompletedQuestions(newCompleted);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleTestEnd();
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Loading UI
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <p className="text-xl">Loading questions for {company} - {round}...</p>
        </div>
      </div>
    );
  }

  // Error UI
  if (error || questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 py-10">
        <div className="bg-white p-8 rounded-lg max-w-md">
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

  // BEFORE START SCREEN
  if (!testStarted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-2xl w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">Practice Session</h2>

          <div className="space-y-4 mb-6">
            <p><strong>Company:</strong> {company}</p>
            <p><strong>Round:</strong> {round}</p>
            <p><strong>Questions:</strong> {questions.length}</p>
            <p>
              <strong>Estimated Time:</strong> {timeLimit || estimatedTime?.formatted}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">
              💡 You'll have {timeLimit || estimatedTime?.formatted} to solve all {questions.length} questions.
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
  const currentQuestion = questions[currentQuestionIndex];
  const progress = Math.round((completedQuestions.size / questions.length) * 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg max-w-4xl w-full mx-4 my-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <div>
            <h2 className="text-2xl font-bold">{company} - {round}</h2>
            <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>
          <div className={`text-4xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-green-600'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Progress</span>
            <span className="text-sm font-semibold">{completedQuestions.size}/{questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">{currentQuestion.title}</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                currentQuestion.difficulty === 'Easy'
                  ? 'bg-green-100 text-green-800'
                  : currentQuestion.difficulty === 'Medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {currentQuestion.difficulty}
              </span>
            </div>
            <div className="text-right text-sm text-gray-600">
              {currentQuestion.acRate?.toFixed(1) || 'N/A'}% Acceptance
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-sm"><strong>Topics:</strong> {currentQuestion.topicTags?.join(', ') || 'N/A'}</p>
            <p className="text-sm text-gray-600">{currentQuestion.description}</p>
          </div>
        </div>

        {/* Buttons */}
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

        {/* Nav Buttons */}
        <div className="mt-6 pt-4 border-t">
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

        {/* Exit */}
        <button
          onClick={() => {
            if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
              onClose();
            }
          }}
          className="w-full mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg"
        >
          ✕ Exit Practice
        </button>

      </div>
    </div>
  );
};

export default PracticeTest;
