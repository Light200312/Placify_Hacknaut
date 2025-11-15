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
 * @param {string} searchQuery - Job search query (e.g., "React Developer")
 * @param {string} searchLocation - Location to search (e.g., "Bangalore")
 */
const fetchFromAdzuna = async (searchQuery = null, searchLocation = null) => {
  console.log('Fetching private jobs from Adzuna...');
  try {
    // Get search params from parameters or .env
    const country = process.env.ADZUNA_COUNTRY || 'in';
    const query = searchQuery || process.env.ADZUNA_QUERY || 'software developer';
    const location = searchLocation || process.env.ADZUNA_LOCATION || 'India';

    // Log the parameters being sent (for debugging)
    console.log('\n🔍 === ADZUNA API REQUEST ===');
    console.log(`Country: ${country}`);
    console.log(`Query (what): ${query}`);
    console.log(`Location (where): ${location}`);
    console.log(`App ID: ${process.env.ADZUNA_APP_ID?.substring(0, 5)}...`);
    console.log(`App Key: ${process.env.ADZUNA_APP_KEY?.substring(0, 5)}...`);
    
    // Log the full URL being called
    const apiUrl = `https://api.adzuna.com/v1/api/jobs/${country}/search/1`;
    console.log(`🌐 API URL: ${apiUrl}`);
    console.log('📋 Query Params:');
    console.log(`   - what: "${query}"`);
    console.log(`   - where: "${location}"`);
    console.log(`   - app_id: ${process.env.ADZUNA_APP_ID}`);
    console.log(`   - app_key: ${process.env.ADZUNA_APP_KEY}`);
    console.log('==========================\n');

    // UPDATED API CALL: Uses parameters or environment variables
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
      console.log('⚠️  No jobs found from Adzuna API.');
      console.log(`Response status: ${response.status}`);
      console.log(`Total available on API: ${response.data.count || 0}`);
      return;
    }

    console.log(`✅ API Response Success!`);
    console.log(`📊 Found ${response.data.count} total jobs on Adzuna, received ${jobs.length} items for page 1`);
    console.log(`💰 Mean salary: ${response.data.mean ? `₹${response.data.mean.toLocaleString()}` : 'N/A'}`);

    // "Upsert" jobs: Update if exists, insert if new
    // This prevents creating duplicates on every sync
    const jobPromises = jobs.map(job => {
      const jobData = {
        adzunaId: job.id,
        title: job.title,
        companyName: job.company.display_name,
        locationString: job.location.display_name,
        source: 'Private - Adzuna',
        jobType: job.contract_type || job.contract_time || 'full_time',
        description: job.description,
        // New fields from Adzuna API
        category: job.category?.label || 'Job',
        redirectUrl: job.redirect_url || '',
        salaryMin: job.salary_min || null,
        salaryMax: job.salary_max || null,
        latitude: job.latitude || null,
        longitude: job.longitude || null,
        createdDate: job.created || new Date()
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
    console.error('\n❌ === ADZUNA API ERROR ===');
    if (error.response && error.response.status === 401) {
      console.error('ERROR: Invalid App ID or App Key');
      console.error('FIX: Check your .env file for ADZUNA_APP_ID and ADZUNA_APP_KEY');
    } else if (error.response && error.response.status === 400) {
      console.error('ERROR: Bad Request (400) - Request was malformed');
      console.error('Possible issues:');
      console.error('  1. Invalid App ID or App Key format');
      console.error('  2. Invalid search query or location');
      console.error('  3. Missing required parameters');
      console.error('Data sent:', error.config.params);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('ERROR: Cannot connect to Adzuna API');
      console.error('FIX: Check your internet connection');
    } else {
      console.error(`ERROR: ${error.message}`);
    }
    console.error('==========================\n');
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
 * Fetches jobs from MongoDB with optional filtering
 * Query Parameters:
 *   - role: Filter by job title
 *   - company: Filter by company name
 *   - location: Filter by location
 */
export const getJobs = async (req, res) => {
  try {
    let query = {};
    
    // Build MongoDB query from frontend filters
    if (req.query.role) {
      console.log(`🔍 Filtering by role: "${req.query.role}"`);
      query.title = { $regex: req.query.role, $options: 'i' }; // Case-insensitive
    }
    
    if (req.query.company) {
      console.log(`🔍 Filtering by company: "${req.query.company}"`);
      query.companyName = { $regex: req.query.company, $options: 'i' };
    }
    
    if (req.query.location) {
      console.log(`🔍 Filtering by location: "${req.query.location}"`);
      query.locationString = { $regex: req.query.location, $options: 'i' };
    }

    // Find jobs matching query, sort by most recent
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    
    console.log(`✅ Found ${jobs.length} jobs matching filters`);
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

/**
 * POST /api/jobs/sync
 * Manually re-runs the data fetching functions (syncs all default jobs)
 */
export const syncJobs = async (req, res) => {
  try {
    console.log('Manual sync triggered...');
    await fetchFromAdzuna(process.env.ADZUNA_QUERY || 'software developer');
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
 * POST /api/jobs/search
 * Search Adzuna API for new jobs based on user query and location
 * Request Body:
 *   - query: Job search query (e.g., "React Developer")
 *   - location: Location to search (e.g., "Bangalore")
 */
export const searchAdzunaJobs = async (req, res) => {
  try {
    const { query, location } = req.body;
    
    // Validate input
    if (!query || query.trim() === '') {
      return res.status(400).json({ message: "Search query is required" });
    }
    
    console.log(`\n🔎 === ADZUNA SEARCH REQUEST ===`);
    console.log(`Query: "${query}"`);
    console.log(`Location: "${location || 'India'}"`);
    console.log(`================================\n`);
    
    const searchQuery = query.trim();
    const searchLocation = location?.trim() || 'India';
    
    // Call Adzuna API with user's search parameters
    await fetchFromAdzuna(searchQuery, searchLocation);
    
    console.log(`✅ Search complete. Fetching results...\n`);
    
    // Return the newly found jobs
    getJobs(req, res);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ message: "Error searching for jobs" });
  }
};

/**
 * seedDatabase
 * Runs on server startup to ensure DB is not empty
 * OPTIMIZED: Only seeds government jobs on startup (Adzuna takes too long)
 */
export const seedDatabase = async () => {
  try {
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      console.log("\n⏱️  No jobs found. Seeding initial government jobs...");
      console.log("📌 Tip: Click 'Sync Jobs' to fetch private jobs from Adzuna API\n");
      await seedGovJobs();
      console.log("✅ Initial government jobs seeded.\n");
    } else {
      console.log(`\n✅ Database already contains ${jobCount} jobs. Skipping initial seed.\n`);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};