import express from 'express';
const router = express.Router();

// --- OLD CONTROLLER ---
import {
  // getLeetcodeQuestions, // We are replacing this
  createTestSession,
  getSupportedCompanies,
  getInterviewRounds
} from '../controllers/leetcodeController.js';

// --- NEW CONTROLLER ---
import { getPracticeQuestions } from '../controllers/practiceController.js';


/**
 * LeetCode API Integration Routes
 * Generates practice questions based on company and interview round
 */

// GET /api/leetcode/questions
// --- UPDATED TO USE NEW CONTROLLER ---
// Fetches from cache or generates new questions via AI
// Query: ?company=Google&round=Technical&count=45%20Questions
router.get('/questions', getPracticeQuestions);

// POST /api/leetcode/test-session
// This may be obsolete now, but we'll leave it.
// Consider updating createTestSession to use getPracticeQuestions logic.
router.post('/test-session', createTestSession);

// GET /api/leetcode/companies
// Get list of supported companies
router.get('/companies', getSupportedCompanies);

// GET /api/leetcode/rounds
// Get interview rounds for job analysis
router.get('/rounds', getInterviewRounds);

export default router;