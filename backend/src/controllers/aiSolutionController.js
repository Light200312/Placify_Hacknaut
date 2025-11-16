import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent';

/**
 * Generate a solution for a coding question using Gemini AI
 */
export const generateSolution = async (req, res) => {
  try {
    const { questionTitle, questionProblem, language } = req.body;

    if (!questionTitle || !questionProblem) {
      return res.status(400).json({ 
        message: 'Question title and problem are required' 
      });
    }

    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(503).json({ 
        message: 'AI solution generation not configured. Please set GEMINI_API_KEY in environment.',
        solution: null
      });
    }

    // Create the prompt for Gemini
 // Create the prompt for Gemini
   // ... inside generateSolution in aiSolutionController.js

    // Create the prompt for Gemini
    const languageLabel = language || 'JavaScript';
    const prompt = `
You are an expert programming tutor. Generate a solution and a separate explanation for the following problem.

Problem Title: ${questionTitle}
Problem Statement: ${questionProblem}
Language: ${languageLabel}

Provide your response in two parts:
1.  **CODE_SOLUTION**: Start this part with the exact line \`CODE_SOLUTION_START\`. Provide *only* the raw, working code. Do not include any comments or markdown backticks.
2.  **CODE_EXPLANATION**: Start this part with the exact line \`CODE_EXPLANATION_START\`. Provide a clear, step-by-step explanation.
    **Use markdown for formatting (like **bolding** for emphasis, lists, and \`inline code\` for variables or function names).**
    Start each major section with a \`###\` heading (e.g., \`### 💡 Solution Approach\`, \`### ⏱️ Complexity Analysis\`).

EXAMPLE:

CODE_SOLUTION_START
/**
 * @param {number[]} nums
 * @return {number}
 */
const missingNumber = (nums) => {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((acc, current) => acc + current, 0);
    return expectedSum - actualSum;
};
CODE_EXPLANATION_START
### 💡 Solution Approach
The problem states the array has \`n\` distinct numbers from the range \`0\` to \`n\`. This means one number is missing.

1.  **Find \`n\`:** The value \`n\` is simply the \`nums.length\`.
2.  **Calculate Expected Sum:** We use Gauss's formula: \`Sum = n * (n + 1) / 2\`.
3.  **Calculate Actual Sum:** We sum all numbers in the \`nums\` array using \`.reduce()\`.
4.  **Find the Difference:** The missing number is the \`expectedSum\` - \`actualSum\`.

### ⏱️ Complexity Analysis
* **Time Complexity: \`O(n)\`**
    We iterate through the array once to find the actual sum.
* **Space Complexity: \`O(1)\`**
    We only use a few constant-space variables.
`;
    // Call Gemini API
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    // Extract the solution from Gemini response
    const solution = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
                    'Failed to generate solution';

    return res.status(200).json({
      success: true,
      solution,
      language: languageLabel,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating solution:', error.message);
    
    if (error.response?.status === 429) {
      return res.status(429).json({
        message: 'Rate limit exceeded. Please try again later.',
        error: 'RATE_LIMITED'
      });
    }

    return res.status(500).json({
      message: 'Failed to generate solution',
      error: error.message
    });
  }
};

/**
 * Get solution for a specific question from cache or generate new
 */
export const getSolution = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { language = 'JavaScript' } = req.query;

    if (!questionId) {
      return res.status(400).json({ message: 'Question ID is required' });
    }

    // TODO: Check if solution is cached in database
    // For now, return a message to generate solution

    return res.status(200).json({
      message: 'Use POST to /generate-solution to generate a new solution',
      questionId
    });

  } catch (error) {
    console.error('Error getting solution:', error);
    return res.status(500).json({
      message: 'Failed to get solution',
      error: error.message
    });
  }
};

/**
 * Explain a solution
 */
export const explainSolution = async (req, res) => {
  try {
    const { code, language, question } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }

    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(503).json({ 
        message: 'AI explanation not available. Please set GEMINI_API_KEY.',
      });
    }

    const prompt = `
Explain the following ${language || 'code'} solution:

${code}

${question ? `Problem: ${question}` : ''}

Provide:
1. High-level approach explanation
2. Step-by-step walkthrough
3. Time and space complexity analysis
4. Edge cases and potential improvements`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const explanation = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
                       'Failed to generate explanation';

    return res.status(200).json({
      success: true,
      explanation,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error explaining solution:', error);
    return res.status(500).json({
      message: 'Failed to explain solution',
      error: error.message
    });
  }
};
