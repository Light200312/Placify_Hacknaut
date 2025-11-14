import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../src/config/db.js';

// Import routes
import profileRoutes from '../src/routes/profileRoutes.js';
import aiRoutes from '../src/routes/aiRoutes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// --- Middleware ---
// Increase body-parser limit to handle base64 image data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// --- API Routes ---
app.use('/api/profile', profileRoutes);
app.use('/api', aiRoutes); // Contains /analyze and /parse-resume

// --- Configuration ---
const PORT = process.env.PORT || 5000;

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});