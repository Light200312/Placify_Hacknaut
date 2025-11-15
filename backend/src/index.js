import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"; // Use .env file for environment variables
dotenv.config();
// --- Import local modules ---
import connectDB from './config/db.js'; // <-- Our DB connection function
import { seedDatabase } from './controllers/job.js';

// --- Our Existing Routes ---
import jobRoutes from './routes/job.js';

// --- Your New Routes ---
// Note: I'm standardizing paths to the './routes' folder
import profileRoutes from './routes/profileRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import authRoutes from './routes/auth.js';
import questionRoutes from './routes/questions.js';
import blogRoutes from './routes/blogs.js';
import contactRoutes from './routes/contact.js';
import compilerRoutes from './routes/compiler.js';


const app = express();
const PORT = process.env.PORT || 5001; // Kept 5001 for our frontend proxy

// --- Middleware ---
app.use(cors());
// Use your new, larger limits for JSON and URL-encoded data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- API Routes ---
// Our existing job routes
app.use('/api', jobRoutes); 

// Your new routes
app.use('/api/profile', profileRoutes);
app.use('/api', aiRoutes); // Contains /analyze and /parse-resume
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/compiler', compilerRoutes);


// --- Start Server Function ---
const startServer = async () => {
  try {
    // 1. Connect to the database first
    await connectDB();
    
    // 2. AFTER the connection is successful, run the seeder
    // This is the correct place to call it.
    await seedDatabase();
    
    // 3. Start the Express server
    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// --- Run the server ---
startServer();