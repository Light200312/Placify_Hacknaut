import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { aptitudeQuestions } from '../data/aptitudeQuestions';
import { companies } from '../data/companies';
import Question from '../components2/Question';
import useTimer from '../hooks/useTimer';
import AptitudeEntryForm from '../components2/AptitudeEntryForm';

const APTITUDE_TEST_DURATION_MINS = 10;

function AptitudeTestPage() {
  const { companyName } = useParams();
  const navigate = useNavigate();

  const [hasStarted, setHasStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', college: '' });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const company = companies.find((c) => c.id === companyName);
  const relevantQuestions = aptitudeQuestions.filter(
    (q) => q.company === companyName && q.round === 'aptitude'
  );

  // Use useCallback to prevent function recreation
  const handleSubmitTest = useCallback(() => {
    console.log("Submitting test...");
    console.log("Company:", companyName);
    console.log("User Answers:", userAnswers);
    console.log("Questions:", relevantQuestions);

    // Prepare result data
    const resultData = {
      userAnswers,
      questions: relevantQuestions,
      userInfo
    };

    // Save to localStorage with proper key
    const storageKey = `result_${companyName}_aptitude`;
    localStorage.setItem(storageKey, JSON.stringify(resultData));
    console.log("Saved to localStorage with key:", storageKey);

    // Navigate to results page
    navigate(`/results/${companyName}/aptitude`, {
      state: resultData,
      replace: true,
    });
  }, [companyName, userAnswers, relevantQuestions, userInfo, navigate]);

  const { timeLeft, formattedTime, startTimer, stopTimer, resetTimer } = useTimer(
    APTITUDE_TEST_DURATION_MINS * 60,
    handleSubmitTest
  );

  useEffect(() => {
    if (hasStarted) {
      startTimer();
    } else {
      stopTimer();
      resetTimer();
    }
    return () => stopTimer();
  }, [hasStarted]);

  if (!company) {
    return (
      <div className="text-center mt-10 text-red-600">
        Company or Aptitude test not found!
      </div>
    );
  }

  const handleStartTest = (data) => {
    setUserInfo(data);
    setHasStarted(true);
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    console.log("Answer changed - ID:", questionId, "Option:", selectedOption);
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < relevantQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (!hasStarted) {
    return <AptitudeEntryForm onStart={handleStartTest} />;
  }

  if (relevantQuestions.length === 0) {
    return (
      <div className="text-center mt-10 text-red-600">
        No aptitude questions available for {company.name}.
      </div>
    );
  }

  const currentQuestion = relevantQuestions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center my-6">
        {company.name} Aptitude Test
      </h1>

      {/* Timer + Progress */}
      <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-md shadow-sm">
        <div className="text-lg">
          Time Left:{' '}
          <span className="font-semibold text-red-600">
            {formattedTime}
          </span>
        </div>
        <div className="text-lg">
          Question {currentQuestionIndex + 1} of {relevantQuestions.length}
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <Question
          question={currentQuestion}
          selectedAnswer={userAnswers[currentQuestion.id]}
          onAnswerChange={handleAnswerChange}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50 transition-colors"
        >
          Previous
        </button>

        {currentQuestionIndex < relevantQuestions.length - 1 ? (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmitTest}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Submit Test
          </button>
        )}
      </div>
    </div>
  );
}

export default AptitudeTestPage;
