import express from 'express';
import { parseResume, analyzeJob, getPrepGuide } from '../controllers/aiController.js';

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

export default router;