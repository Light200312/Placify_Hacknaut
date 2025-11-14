import express from 'express';
import { saveProfile } from '../controllers/profileController.js';

const router = express.Router();

/**
 * @route   POST /api/profile
 * @desc    Saves or updates a student's profile.
 * @access  Public
 */
router.post('/', saveProfile);

export default router;