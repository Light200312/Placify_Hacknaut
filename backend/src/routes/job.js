import express from 'express';
const router = express.Router();
import {getJobs,syncJobs} from  '../controllers/job.js';

// --- Job API Endpoints ---

// GET /api/jobs
// Fetches all jobs from the database
router.get('/jobs', getJobs);

// POST /api/jobs/sync
// Manually triggers a new fetch from the Adzuna API
router.post('/jobs/sync', syncJobs);

export default router;