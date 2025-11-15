import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function ResultPage() {
  const { companyName, roundType } = useParams();
  const location = useLocation();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Location state:", location.state);

    // Priority 1: Use location.state if available
    if (location.state?.userAnswers && location.state?.questions) {
      console.log("Loading from location state");
      setResultData(location.state);
      // Save to localStorage as backup
      localStorage.setItem(
        `result_${companyName}_${roundType}`,
        JSON.stringify(location.state)
      );
      setLoading(false);
    } else {
      // Priority 2: Load from localStorage
      console.log("Loading from localStorage");
      const storageKey = `result_${companyName}_${roundType}`;
      const savedData = localStorage.getItem(storageKey);
      console.log("Saved data:", savedData);

      if (savedData) {
        setResultData(JSON.parse(savedData));
      }
      setLoading(false);
    }
  }, [companyName, roundType, location.state]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center mt-20 text-gray-600 text-lg">
        Loading results...
      </div>
    );
  }

  const { userAnswers = {}, questions = [], userInfo = {} } = resultData || {};

  // Safety guard — no test data
  if (!userAnswers || !questions || questions.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center mt-20 text-red-600 text-lg font-medium">
        ⚠️ No result data available. Please complete the test first.
      </div>
    );
  }

  // Calculate score
  const score = questions.reduce(
    (acc, q) => (userAnswers[q.id] === q.correctAnswer ? acc + 1 : acc),
    0
  );
  const totalQuestions = questions.length;
  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 60;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        {companyName.toUpperCase()}{" "}
        {roundType.charAt(0).toUpperCase() + roundType.slice(1)} Test Results
      </h1>

      {/* Summary Section */}
      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10 text-center border border-gray-200">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Well Done, {userInfo?.name || "Candidate"}! 🎉
        </h2>
        <p className="text-xl mb-3 text-gray-700">
          Your Score:{" "}
          <span className="font-bold text-green-600">
            {score} / {totalQuestions}
          </span>
        </p>
        <p className="text-xl text-gray-700">
          Percentage:{" "}
          <span
            className={`font-bold ${passed ? "text-green-600" : "text-red-600"
              }`}
          >
            {percentage.toFixed(2)}%
          </span>
        </p>

        <div
          className={`mt-6 text-lg font-semibold ${passed ? "text-green-700" : "text-red-700"
            }`}
        >
          {passed
            ? "🎯 Congratulations! You passed this round."
            : "💪 Keep practicing — you'll improve next time!"}
        </div>
      </div>

      {/* Detailed Review Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Detailed Review
        </h3>

        {questions.map((q, index) => (
          <div
            key={q.id}
            className="bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-gray-300 hover:border-blue-400 transition-all"
          >
            <p className="text-lg font-semibold mb-3 text-gray-900">
              Q{index + 1}. {q.question}
            </p>

            {/* Options */}
            <div className="space-y-2 mb-3">
              {q.options.map((option, optIndex) => {
                const isCorrect = option === q.correctAnswer;
                const isUserAnswer = userAnswers[q.id] === option;

                return (
                  <p
                    key={optIndex}
                    className={`p-2 rounded-md transition-all ${isCorrect
                        ? "bg-green-100 text-green-800 font-medium"
                        : isUserAnswer && !isCorrect
                          ? "bg-red-100 text-red-800 font-medium"
                          : "text-gray-700"
                      }`}
                  >
                    {option}
                    {isCorrect && (
                      <span className="ml-2 text-sm font-semibold">
                        ✅ (Correct)
                      </span>
                    )}
                    {isUserAnswer && !isCorrect && (
                      <span className="ml-2 text-sm font-semibold">
                        ❌ (Your Answer)
                      </span>
                    )}
                  </p>
                );
              })}
            </div>

            {/* Wrong answer note */}
            {userAnswers[q.id] !== q.correctAnswer && (
              <p className="text-red-700 font-medium mb-2">
                You answered: {userAnswers[q.id] || "Not attempted"}
              </p>
            )}

            {/* Explanation */}
            {q.explanation && (
              <p className="text-gray-600 text-sm mt-3 border-t pt-3 leading-relaxed">
                <span className="font-semibold text-gray-800">Explanation:</span>{" "}
                {q.explanation}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultPage;
