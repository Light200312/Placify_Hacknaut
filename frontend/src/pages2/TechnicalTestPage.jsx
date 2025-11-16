import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CodeEditor from '../components2/CodeEditor';
import CodeCompiler from '../components2/CodeCompiler';
import useTimer from '../hooks/useTimer';
import { technicalQuestions } from '../data/technicalQuestions';
import { companies } from '../data/companies';
import axios from 'axios';
// --- NEW ---
// Import this to render the markdown explanation
// You'll need to install it: npm install react-markdown
import ReactMarkdown from 'react-markdown'; 
// To make it look good, also install: npm install @tailwindcss/typography
// And add `require('@tailwindcss/typography')` to your tailwind.config.js plugins

const CODING_TEST_DURATION_MINS = 60;

// ----------------------------------------------------------------------
// NEW Component (based on Code 2's pattern)
// This new component manages the state for the editor and compiler.
// ----------------------------------------------------------------------
function QuestionInterface({ question, onSubmit }) {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [userCode, setUserCode] = useState('');
  
  const [loadingSolution, setLoadingSolution] = useState(false);
  const [solutionError, setSolutionError] = useState('');
  
  // --- MODIFIED ---
  // We'll store the explanation as an array of objects
  const [explanationCards, setExplanationCards] = useState([]);

  // --- NEW ---
  // This state will be our "signal" to the compiler
  const [executeSignal, setExecuteSignal] = useState(0);

  // Effect to set starter code when the question or language changes
  useEffect(() => {
    setUserCode(
      question.starterCode?.[selectedLanguage] || '// Start coding here...'
    );
    // --- MODIFIED ---
    // Clear all solution-related state on question/language change
    setSolutionError('');
    setExplanationCards([]); // Clear cards on change
    // We don't reset the executeSignal, so it always increments
  }, [question, selectedLanguage]);

  // --- MODIFIED ---
  // Updated fetchSolution to parse the explanation into cards
  const fetchSolution = async () => {
    setLoadingSolution(true);
    setSolutionError('');
    setExplanationCards([]); // Clear previous cards

    try {
      const response = await axios.post('http://localhost:5000/api/solution/generate', {
        questionTitle: question.title,
        questionProblem: question.problem,
        language: selectedLanguage,
      });

      const data = response.data;

      if (data.success && data.solution) {
        
        // --- NEW SPLITTING LOGIC ---
        const solutionText = data.solution;
        
        let code = '';
        let explanation = '';

        // Check if the AI followed our new format
        if (solutionText.includes('CODE_EXPLANATION_START')) {
          const parts = solutionText.split('CODE_EXPLANATION_START');
          code = parts[0].replace('CODE_SOLUTION_START', '').trim();
          explanation = parts[1].trim();
        } else {
          // Fallback if the AI messes up or we use the old prompt
          // Clean the backticks (like we did before)
          code = solutionText.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '');
          explanation = '### ⚠️ Error\nAI failed to provide a separate explanation. The code has been placed in the editor.';
        }
        
        // Set the code directly into the editor
        setUserCode(code);
        
        // --- NEW CARD PARSING LOGIC ---
        if (explanation) {
          // 1. Split the explanation by '### ' headings
          const cardStrings = explanation.split(/###\s+/).filter(Boolean);
          
          // 2. Map them into {title, content} objects
          const cards = cardStrings.map(cardText => {
            const parts = cardText.split('\n'); // Split title from content
            const title = parts[0].trim();     // e.g., "💡 Solution Approach"
            const content = parts.slice(1).join('\n').trim(); // The rest is content
            return { title, content };
          });
          
          // 3. Set the new array state
          setExplanationCards(cards);
        }

        // --- NEW ---
        // This tells the compiler to run by changing the signal prop
        setExecuteSignal(prevCount => prevCount + 1);
        
      } else {
        setSolutionError(data.message || 'Failed to generate a valid solution.');
      }

    } catch (err) { // <-- Fixed syntax error here
      if (err.response && err.response.data && err.response.data.message) {
        setSolutionError(err.response.data.message);
      } else {
        setSolutionError('Error fetching solution: ' + err.message);
      }
    } finally {
      setLoadingSolution(false);
    }
  };


  return (
    <div className="space-y-4">
      {/* Problem Statement */}
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-white">{question.title}</h2>
          <button
            onClick={fetchSolution}
            disabled={loadingSolution}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded font-semibold text-sm"
          >
            {loadingSolution ? '⏳ Loading...' : '👁️ See Solution'}
          </button>
        </div>

        {/* Show error if any */}
        {solutionError && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-200">
            ⚠️ {solutionError}
          </div>
        )}
        
        {/* --- MODIFIED --- 
          This block renders the problem and the explanation cards
        */}
        {explanationCards.length > 0 && (
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-bold text-blue-200">
              💡 AI Solution Explanation
            </h3>

            {/* This is what you asked for: Show the question again */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 className="text-md font-bold text-gray-300 mb-2">
                Problem Recap
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {question.problem}
              </p>
            </div>
            
            {/* This renders the explanation in separate cards */}
            {explanationCards.map((card, index) => (
              <div 
                key={index} 
                className="bg-gray-800 border border-gray-700 rounded-lg p-4"
              >
                <h4 className="text-md font-bold text-blue-300 mb-2">
                  {card.title}
                </h4>
                {/* We use `prose-sm` to make the markdown text a bit smaller
                  inside the card, which looks better. 
                */}
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{card.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Problem description (now hidden if explanation is shown) */}
        {explanationCards.length === 0 && (
          <p className="text-gray-300 mb-4 leading-relaxed">
            {question.problem}
          </p>
        )}

        {question.exampleInput && (
          <div className="space-y-2 mb-4">
            <p className="font-bold text-gray-200">Example:</p>
            <p className="text-gray-400">
              <strong>Input:</strong> {question.exampleInput}
            </p>
            <p className="text-gray-400">
              <strong>Output:</strong> {question.exampleOutput}
            </p>
          </div>
        )}

        <span
          className={`inline-block px-3 py-1 rounded text-white font-semibold ${
            question.difficulty === 'Easy'
              ? 'bg-green-600'
              : question.difficulty === 'Medium'
              ? 'bg-yellow-600'
              : 'bg-red-600'
          }`}
        >
          {question.difficulty}
        </span>
      </div>

      {/* Code Editor */}
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">📝 Code Editor</h3>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>
        </div>
        <CodeEditor
          code={userCode}
          language={selectedLanguage}
          onChange={setUserCode}
        />
      </div>

      {/* Code Compiler */}
      {/* <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
        <h3 className="text-lg font-bold mb-4">⚙️ Compiler & Output</h3>
        
        <CodeCompiler 
          code={userCode} 
          language={selectedLanguage}
          executeSignal={executeSignal} // Pass the signal as a prop
        />
      </div> */}

      {/* Submit Button */}
      {/* <button
        onClick={() => onSubmit(userCode, selectedLanguage)} // Pass state up to parent
        className="w-full py-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-bold rounded-lg transition text-white"
      >
        ✅ Submit Solution
      </button> */}
    </div>
  );
}

// ----------------------------------------------------------------------
// Main Component (No changes below this line)
// ----------------------------------------------------------------------
function TechnicalTestPage() {
  const { companyName } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // All state hooks must come first, before any conditional returns
  const [testStarted, setTestStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Calculate derived values
  const company = companies.find((c) => c.id === companyName);
  const relevantQuestions = technicalQuestions.filter(
    (q) => q.company === companyName && q.round === 'technical'
  );
  const currentQuestion = relevantQuestions[currentQIndex];

  // All callback hooks must come before conditional returns
  const handleSubmitTest = useCallback(() => {
    console.log('Submitting test...');
    const resultData = {
      submittedAnswers,
      questions: relevantQuestions,
      userInfo: { name: user?.name || 'User', email: user?.email },
    };

    const storageKey = `result_${companyName}_technical`;
    localStorage.setItem(storageKey, JSON.stringify(resultData));
    setShowResults(true);
  }, [companyName, submittedAnswers, relevantQuestions, user]);

  const { timeLeft, formattedTime, startTimer, stopTimer, resetTimer } =
    useTimer(CODING_TEST_DURATION_MINS * 60, handleSubmitTest);

  useEffect(() => {
    if (testStarted && !showResults) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [testStarted, showResults, startTimer, stopTimer]);

  const handleStartTest = useCallback(() => {
    setTestStarted(true);
  }, []);

  const handleSubmitSolution = useCallback((code, language) => {
    setSubmittedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        code: code,
        language: language,
        submittedAt: new Date(),
      },
    }));

    // Move to next question
    if (currentQIndex < relevantQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // User submitted the last question, auto-finish test
      setShowResults(true);
    }
  }, [currentQIndex, currentQuestion?.id, relevantQuestions.length]);

  const handleNextQuestion = useCallback(() => {
    if (currentQIndex < relevantQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    }
  }, [currentQIndex, relevantQuestions.length]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  }, [currentQIndex]);

  const handleFinishTest = useCallback(() => {
    setShowResults(true);
  }, []);

  // Redirect if not authenticated (after all hooks)
  if (!user || !token) {
    navigate('/signin');
    return null;
  }

  if (!company) {
    return (
      <div className="text-center mt-10 text-red-600 text-lg">
        Company or Technical test not found!
      </div>
    );
  }

  if (relevantQuestions.length === 0) {
    return (
      <div className="text-center mt-10 text-red-600 text-lg">
        No technical questions available for {company.name}.
      </div>
    );
  }

  // --- ADDED CHECK ---
  // Ensure currentQuestion is defined before rendering the test
  if (!currentQuestion) {
    // This can happen briefly or if filtering results in an empty array
    // after an initial non-empty one (though unlikely here)
    return (
       <div className="text-center mt-10 text-yellow-500 text-lg">
        Loading question...
       </div>
    );
  }

  // Show Results Screen
  if (showResults) {
    const solvedCount = Object.keys(submittedAnswers).length;
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-lg p-8 border border-gray-700 shadow-xl text-center">
            <h1 className="text-4xl font-bold mb-4">🎉 Test Completed!</h1>
            <div className="text-6xl font-bold mb-2 text-blue-400">
              {solvedCount}/{relevantQuestions.length}
            </div>
            <p className="text-xl text-gray-300 mb-6">
              You submitted solutions for {solvedCount} out of{' '}
              {relevantQuestions.length} problems
            </p>

            <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4">📊 Your Submissions</h2>
              <div className="space-y-2">
                {relevantQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded"
                  >
                    <span className="font-semibold">{q.title}</span>
                    {submittedAnswers[q.id] ? (
                      <span className="text-green-400 font-bold">
                        ✅ Submitted
                      </span>
                    ) : (
                      <span className="text-red-400 font-bold">
                        ❌ Not Attempted
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setTestStarted(false);
                  setShowResults(false);
                  setCurrentQIndex(0);
                  setSubmittedAnswers({});
                  resetTimer();
                }}
                className="flex-1 py-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-bold rounded-lg transition"
              >
                🔄 Retake Test
              </button>
              <button
                onClick={() => navigate('/home')}
                className="flex-1 py-3 bg-linear-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 font-bold rounded-lg transition"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show Test Instructions Before Start
  if (!testStarted) {
    // ... (This section is unchanged, so I've hidden it for brevity) ...
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-lg p-8 border border-gray-700 shadow-xl">
            <h1 className="text-4xl font-bold mb-6">
              💻 Technical Coding Round
            </h1>

            <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-700 space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">📋 Test Details</h2>
                <p className="text-gray-300 mb-2">
                  <strong>Company:</strong> {company.name}
                </p>
                <p className="text-gray-300 mb-2">
                  <strong>Total Questions:</strong> {relevantQuestions.length}
                </p>
                <p className="text-gray-300 mb-2">
                  <strong>Time Limit:</strong> {CODING_TEST_DURATION_MINS}{' '}
                  minutes
                </p>
                <p className="text-gray-300">
                  <strong>Difficulty:</strong> Easy to Medium
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">🎯 Instructions</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Read the problem statement carefully</li>
                  <li>Write and test your solution using the code editor</li>
                  <li>Run test cases to verify your solution</li>
                  <li>Submit your solution to move to the next problem</li>
                  <li>You can select your preferred programming language</li>
                  <li>
                    Make sure your output matches exactly with expected output
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">
                  🌐 Supported Languages
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    🐍 Python 3
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    📝 JavaScript
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    ☕ Java
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    ⚙ C++
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm">🔧 C</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/home')}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 font-bold rounded-lg transition"
              >
                ← Back
              </button>
              <button
                onClick={handleStartTest}
                className="flex-1 py-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-bold rounded-lg transition transform hover:scale-105"
              >
                🚀 Start Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Test Screen
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div>
            <h1 className="text-2xl font-bold">💻 Technical Round</h1>
            <p className="text-gray-400">
              Question {currentQIndex + 1} of {relevantQuestions.length}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`text-3xl font-bold px-4 py-2 rounded-lg ${
                timeLeft > 600 ? 'bg-blue-900' : 'bg-red-900'
              }`}
            >
              ⏱ {formattedTime}
            </div>
            <div className="text-sm text-gray-400">
              Submitted: {Object.keys(submittedAnswers).length}/
              {relevantQuestions.length}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Questions List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 sticky top-6">
              <h2 className="text-lg font-bold mb-4">📚 Questions</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {relevantQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`w-full text-left p-3 rounded-lg transition border ${
                      idx === currentQIndex
                        ? 'bg-blue-900 border-blue-700'
                        : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{q.title}</span>
                      {submittedAnswers[q.id] ? (
                        <span className="text-green-400 text-lg">✅</span>
                      ) : (
                        <span className="text-gray-500 text-lg">○</span>
                      )}
                    </div>
                    <span
                      className={`text-xs ${
                        q.difficulty === 'Easy'
                          ? 'text-green-400'
                          : q.difficulty === 'Medium'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Question, Editor and Compiler */}
          {/* MODIFIED: 
            This entire block is now replaced with our new component.
            We pass the `key` prop to force a re-render (and reset state) 
            when the question changes.
          */}
          <div className="lg:col-span-2">
            <QuestionInterface
              key={currentQuestion.id}
              question={currentQuestion}
              onSubmit={handleSubmitSolution}
            />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex gap-3 justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQIndex === 0}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 font-bold rounded-lg transition"
          >
            ← Previous
          </button>

          <button
            onClick={handleFinishTest}
            className="px-6 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-bold rounded-lg transition"
          >
            🏁 Finish Test
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={currentQIndex === relevantQuestions.length - 1}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 font-bold rounded-lg transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default TechnicalTestPage;