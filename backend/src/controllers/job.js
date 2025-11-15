import axios from 'axios';
import Job from '../models/job.js';
import dotenv from 'dotenv';
dotenv.config();
// --- Mock Data for Government Jobs (Seeding) ---
const mockGovJobs = [
  // ... (same as before, but we only need a few)
  {
    title: 'IT Specialist (Cybersecurity)',
    companyName: 'Dept. of Homeland Security',
    locationString: 'Washington, D.C.',
    source: 'Govt - USAJOBS',
    jobType: 'Full-time',
    description: 'Protect national infrastructure by identifying and mitigating cybersecurity threats. TS/SCI clearance preferred.'
  },
  {
    title: 'Data Analyst',
    companyName: 'Centers for Disease Control (CDC)',
    locationString: 'Atlanta, GA',
    source: 'Govt - USAJOBS',
    jobType: 'Full-time',
    description: 'Analyze and visualize public health data to inform policy and public response. Experience with R or SAS.'
  },
  {
    title: 'Software Engineer',
    companyName: 'U.S. Digital Service',
    locationString: 'Remote',
    source: 'Govt - USAJOBS',
    jobType: 'Contract',
    description: 'A tour of duty for technology. Help the federal government deliver better services to the American people.'
  }
];

// --- Internal Helper Functions ---

/**
 * Fetches private jobs from Adzuna API
 */
const fetchFromAdzuna = async () => {
  console.log('Fetching private jobs from Adzuna...');
  try {
    // Get search params from .env, with fallbacks
    const country = process.env.ADZUNA_COUNTRY || 'us';
    const query = process.env.ADZUNA_QUERY || 'software developer';
    const location = process.env.ADZUNA_LOCATION || 'New York';

    // UPDATED API CALL: Uses environment variables for country
    const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/${country}/search/1`, {
      params: {
        app_id: process.env.ADZUNA_APP_ID, 
        app_key: process.env.ADZUNA_APP_KEY,
        what: query,
        where: location,
        'content-type': 'application/json'
      }
    });

    const jobs = response.data.results;
    if (!jobs || jobs.length === 0) {
      console.log('No jobs found from Adzuna.');
      return;
    }

    // "Upsert" jobs: Update if exists, insert if new
    // This prevents creating duplicates on every sync
    const jobPromises = jobs.map(job => {
      const jobData = {
        adzunaId: job.id,
        title: job.title,
        companyName: job.company.display_name,
        locationString: job.location.display_name,
        source: 'Private - Adzuna',
        jobType: job.contract_type || 'full_time',
        description: job.description
      };
      
      return Job.findOneAndUpdate(
        { adzunaId: job.id }, // Find by unique Adzuna ID
        jobData,             // Data to insert/update
        { upsert: true, new: true } // Options: create if not found
      );
    });

    await Promise.all(jobPromises);
    console.log(`Successfully synced ${jobs.length} Adzuna jobs.`);

  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('ADZUNA AUTH ERROR: Invalid App ID or App Key. Check your .env file.');
    } else if (error.response && error.response.status === 400) {
      console.error('ADZUNA BAD REQUEST (400): The request was malformed. This can be due to incorrect App ID/Key or invalid parameters.');
      console.error('Data sent:', error.config.params);
    } else {
      console.error('Error fetching from Adzuna API:', error.message);
    }
  }
};

/**
 * Seeds mock government jobs into the DB
 */
const seedGovJobs = async () => {
  console.log('Seeding government jobs...');
  try {
    const jobPromises = mockGovJobs.map(job => {
      return Job.findOneAndUpdate(
        { title: job.title, companyName: job.companyName }, // Find by title/company
        job,
        { upsert: true, new: true }
      );
    });
    
    await Promise.all(jobPromises);
    console.log(`Successfully seeded ${mockGovJobs.length} government jobs.`);
  } catch (error) {
    console.error('Error seeding government jobs:', error);
  }
};


// --- Controller Functions (Exported) ---

/**
 * GET /api/jobs
 * Fetches all jobs from our MongoDB
 */
export const getJobs = async (req, res) => {
  try {
    // Find all jobs, sort by most recent
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

/**
 * POST /api/jobs/sync
 * Manually re-runs the data fetching functions
 */
export const syncJobs = async (req, res) => {
  try {
    console.log('Manual sync triggered...');
    await fetchFromAdzuna();
    await seedGovJobs();
    console.log('Manual sync complete.');
    // Send back the newly updated list of jobs
    getJobs(req, res);
  } catch (error) {
    console.error('Error during manual sync:', error);
    res.status(500).json({ message: "Error syncing jobs" });
  }
};

/**
 * seedDatabase
 * Runs on server startup to ensure DB is not empty
 */
export const seedDatabase = async () => {
  try {
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      console.log("No jobs found. Running initial sync...");
      await fetchFromAdzuna();
      await seedGovJobs();
      console.log("Initial sync complete.");
    } else {
      console.log("Database already contains data. Skipping initial seed.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};