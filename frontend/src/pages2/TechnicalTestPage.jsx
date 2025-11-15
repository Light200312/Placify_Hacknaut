import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CodeEditor from "../components2/CodeEditor";
import CodeCompiler from "../components2/CodeCompiler";
import useTimer from "../hooks/useTimer";

const CODING_TEST_DURATION_MINS = 30;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function TechnicalTestPage() {
  const { companyName } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [userCode, setUserCode] = useState("");
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const currentQuestion = questions[currentQIndex];

  const handleSubmitTest = () => {
    stopTimer();

    const resultData = { userAnswers, questions, userInfo: { name: 'User' } };
    localStorage.setItem(`result_${companyName}_technical`, JSON.stringify(resultData));

    navigate(`/results/${companyName}/technical`, {
      state: resultData,
      replace: true,
    });
  };

  const { timeLeft, formattedTime, startTimer, stopTimer, resetTimer } = useTimer(
    CODING_TEST_DURATION_MINS * 60,
    handleSubmitTest
  );

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${API_URL}/questions/${companyName}/technical`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
          if (data.length > 0) {
            setUserCode(data[0].starterCode || "// Start coding here...");
          }
        } else {
          console.error("Failed to fetch questions");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [companyName, token]);

  // Start timer
  useEffect(() => {
    if (!loading && questions.length > 0) {
      startTimer();
    }
    return () => stopTimer();
  }, [loading, questions.length]);

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading questions...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center mt-10 text-red-600 text-lg">
        ⚠️ No technical questions available for {companyName}.
      </div>
    );
  }

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setUserCode("");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
      setUserCode("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6 text-gray-800">
        {companyName.toUpperCase()} Technical Round ({currentQIndex + 1} of{" "}
        {questions.length})
      </h1>

      {/* Timer and Language */}
      <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-md shadow-sm">
        <div className="text-lg">
          Time Left:{" "}
          <span className="font-semibold text-red-600">
            {formattedTime}
          </span>
        </div>
        <div>
          <label htmlFor="language" className="mr-2 font-medium">
            Language:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Statement */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            {currentQuestion.question}
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Write a program to solve this problem.
          </p>
          <p className="font-bold text-gray-800 mb-2">Difficulty:</p>
          <span className={`px-3 py-1 rounded text-white font-semibold ${currentQuestion.difficulty === 'easy' ? 'bg-green-600' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-600' :
                'bg-red-600'
            }`}>
            {currentQuestion.difficulty?.toUpperCase()}
          </span>
        </div>

        {/* Code Editor */}
        <div>
          <CodeEditor
            code={userCode}
            language={selectedLanguage}
            onChange={setUserCode}
          />
        </div>
      </div>

      {/* Code Compiler */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-3">Compiler & Output</h3>
        <CodeCompiler code={userCode} language={selectedLanguage} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQIndex === 0}
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50 transition font-semibold"
        >
          Previous
        </button>

        {currentQIndex < questions.length - 1 ? (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmitTest}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Submit Test
          </button>
        )}
      </div>
    </div>
  );
}

export default TechnicalTestPage;
