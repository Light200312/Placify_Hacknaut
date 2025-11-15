import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readingQuestions } from '../data/readingQuestions';
import Question from '../components2/Question';
import useTimer from '../hooks/useTimer';

const READING_TEST_DURATION_MINS = 15;

function ReadingTestPage() {
  const { companyName } = useParams();
  const navigate = useNavigate();

  const testData = readingQuestions.find(
    (q) => q.company === companyName && q.round === 'communication'
  );

  const [userAnswers, setUserAnswers] = useState({});
  const { timeLeft, startTimer, stopTimer } = useTimer(
    READING_TEST_DURATION_MINS * 60,
    true
  );

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  if (!testData) {
    return (
      <div className="p-6 text-center mt-20 text-red-600 text-lg font-medium">
        ❌ No Reading Comprehension Test available for this company.
      </div>
    );
  }

  const handleAnswerChange = (questionId, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmitTest = () => {
    stopTimer();
    navigate(`/results/${companyName}/communication`, {
      state: { userAnswers, questions: testData.questions },
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        {companyName.toUpperCase()} – Reading & Communication Test
      </h1>

      {/* Timer & Meta Info */}
      <div className="flex justify-between items-center mb-8 bg-gray-100 p-4 rounded-lg shadow-sm">
        <p className="text-lg font-medium">
          Time Left:{' '}
          <span className="font-semibold text-red-600">
            {formatTime(timeLeft)}
          </span>
        </p>
        <p className="text-lg font-medium">
          Total Questions: {testData.questions.length}
        </p>
      </div>

      {/* Layout: Passage + Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reading Passage */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-blue-100 overflow-y-auto max-h-[80vh]">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Reading Passage
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
            {testData.passage}
          </p>
        </div>

        {/* Questions Section */}
        <div className="lg:col-span-2 space-y-8">
          {testData.questions.map((q, index) => (
            <div
              key={q.qId}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-200"
            >
              <p className="text-lg font-semibold mb-3 text-gray-800">
                Question {index + 1}
              </p>
              <Question
                question={{
                  id: q.qId,
                  question: q.questionText,
                  options: q.options,
                }}
                selectedAnswer={userAnswers[q.qId]}
                onAnswerChange={handleAnswerChange}
              />
            </div>
          ))}

          <div className="text-center mt-10">
            <button
              onClick={handleSubmitTest}
              className="px-10 py-4 bg-green-600 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
            >
              Submit Reading Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadingTestPage;
