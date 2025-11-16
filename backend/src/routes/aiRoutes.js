import express from 'express';
import { parseResume, analyzeJob, getPrepGuide } from '../controllers/aiController.js';
import { generateSolution, getSolution, explainSolution } from '../controllers/aiSolutionController.js';

const router = express.Router();

/**
 * @route   POST /api/parse-resume
 * @desc    Analyzes an uploaded resume (image or PDF) and extracts text.
 * @access  Public
 */
router.post('/parse-resume', parseResume);

/**
 * @route   POST /api/analyze
 * @desc    Runs analysis from both Gemini and OpenRouter concurrently.
 * @access  Public
 */
router.post('/analyze', analyzeJob);

/**
 * @route   POST /api/prep-guide
 * @desc    Gets a company-specific preparation guide using Google Search.
 * @access  Public
 */
router.post('/prep-guide', getPrepGuide);

/**
 * @route   POST /api/solution/generate
 * @desc    Generate a solution for a coding question using Gemini AI
 * @access  Public
 */
router.post('/solution/generate', generateSolution);

/**
 * @route   GET /api/solution/:questionId
 * @desc    Get cached solution for a question
 * @access  Public
 */
router.get('/solution/:questionId', getSolution);

/**
 * @route   POST /api/solution/explain
 * @desc    Explain a given solution using Gemini AI
 * @access  Public
 */
router.post('/solution/explain', explainSolution);

export default router;