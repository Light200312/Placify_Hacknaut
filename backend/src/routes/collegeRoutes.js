import express from 'express';
import { getCompanies, uploadPlacementData, getPlacementQuestions } from '../controllers/collegeController.js';
import multer from 'multer';

const router = express.Router();

// Configure Multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB file limit
});

// Existing route for fetching recruiters
router.post('/', getCompanies);

// --- NEW ROUTE 1: Uploading Placement Data (PDF) ---
// Middleware: upload.single('dataFile')
// Endpoint: POST /api/colleges/upload-data
router.post('/upload-data', upload.single('dataFile'), uploadPlacementData);

// --- NEW ROUTE 2: Fetching Custom Questions ---
// Endpoint: GET /api/colleges/:collegeName/questions/:roundType
router.get('/:collegeName/questions/:roundType', getPlacementQuestions);

export default router;