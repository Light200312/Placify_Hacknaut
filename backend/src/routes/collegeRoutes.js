import express from 'express';
import { getCompanies } from '../controllers/collegeController.js';

const router = express.Router();

// This route will correspond to /api/colleges (POST)
router.post('/', getCompanies);

export default router;