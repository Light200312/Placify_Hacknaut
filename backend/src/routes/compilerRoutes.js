import express from 'express';
const router = express.Router();

// Import the controller that contains the compilation logic
// Note: We add .js extension for ES Module imports
import { handleCompile } from '../controllers/compilerControler.js';

/**
 * @route   POST /
 * @desc    Compile and run a piece of code
 * @access  Public
 */
// This '/' route is relative to the path defined in server.js
router.post('/', handleCompile);

// Export the router as the default
export default router;