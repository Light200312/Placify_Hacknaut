import express from 'express';
const router = express.Router();
import {getJobs, syncJobs, searchAdzunaJobs} from  '../controllers/job.js';

// --- Job API Endpoints ---

// GET /api/jobs
// Fetches all jobs from the database with optional filters
router.get('/jobs', getJobs);

// POST /api/jobs/sync
// Manually triggers a sync of default jobs from the Adzuna API
router.post('/jobs/sync', syncJobs);

// POST /api/jobs/search
// Search Adzuna API for new jobs based on user query and location
router.post('/jobs/search', searchAdzunaJobs);

export default router;