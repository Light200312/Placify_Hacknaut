import express from 'express';
import { generateSuggestions } from '../controllers/suggestionController.js';

const router = express.Router();

// POST /api/suggestions/generate
router.post('/generate', generateSuggestions);

export default router;