import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for data fetching

// --- NEW: API URL Constant ---
// Note: Using 5001 to match your backend server's port
const API_URL = 'http://localhost:5000';

// --- React Components ---

/**
 * Header Component
 * Displays the main title and a Sync button
 */
function Header({ onSync }) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 md:px-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Job Aggregator Portal
          </h1>
          <p className="text-gray-600">Find Govt & Private Jobs</p>
        </div>
        <button
          onClick={onSync}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Sync Jobs
        </button>
      </div>
    </header>
  );
}

/**
 * Provides input fields for filtering by job role, company, and location.
 */
function SearchBar({ filters, onFilterChange }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      {/* Updated grid to accommodate 3 items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Job Role Filter */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Job Role / Title
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={filters.role}
            onChange={onFilterChange}
            placeholder="e.g., Software Engineer"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Company Filter */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={filters.company}
            onChange={onFilterChange}
            placeholder="e.g., Google or FBI"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* --- NEW: Location Filter --- */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location (State/City)
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={onFilterChange}
            placeholder="e.g., Delhi or Karnataka"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-Dblue-500"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * JobCard Component
 * Displays a single job listing with details and tags.
 */
function JobCard({ job }) {
  // Determine tag color based on the job source
  const sourceTagColor = job.source.includes('Govt')
    ? 'bg-blue-100 text-blue-800'
    : 'bg-green-100 text-green-800';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-[1.01] transition-transform duration-200 ease-in-out mb-6">
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
          <p className="text-md text-gray-700">{job.companyName}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${sourceTagColor}`}>
            {job.source}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            {job.locationString}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            {job.jobType}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3">
          {job.description}
        </p>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
          View Details &rarr;
        </a>
      </div>
    </div>
  );
}

/**
 * JobList Component
 * Renders the list of filtered jobs.
 */
function JobList({ jobs, loading }) {
  if (loading) {
    return (
      <div className="text-center p-10 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Loading Jobs...</h3>
        <p className="text-gray-500">Please wait a moment.</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">No Jobs Found</h3>
        <p className="text-gray-500">Try adjusting your search filters or hitting "Sync Jobs".</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Showing {jobs.length} Jobs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}

/**
 * Main App Component
 * Manages state and filtering logic.
 */
export default function App() {
  const [filters, setFilters] = useState({
    role: '',
    company: '',
    location: '' // <-- Kept this filter state
  });
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // This function fetches jobs from our backend
  const fetchJobs = async () => {
    try {
      setLoading(true);
      // --- UPDATED: Using API_URL ---
      const res = await axios.get(`${API_URL}/api/jobs`);
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // This function triggers the backend to sync with Adzuna
  const handleSyncJobs = async () => {
    try {
      setLoading(true);
      // --- UPDATED: Using API_URL ---
      const res = await axios.post(`${API_URL}/api/jobs/sync`);
      // The sync endpoint returns the new list of jobs
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (error) {
      console.error("Failed to sync jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs on initial component mount
  useEffect(() => {
    fetchJobs();
  }, []); // Empty dependency array means this runs only once on mount

  // This effect re-runs the filter logic whenever filters or the master job list change
  useEffect(() => {
    let allJobs = jobs;
    if (filters.role) {
      allJobs = allJobs.filter(job =>
        job.title.toLowerCase().includes(filters.role.toLowerCase())
      );
    }
    if (filters.company) {
      allJobs = allJobs.filter(job =>
        job.companyName.toLowerCase().includes(filters.company.toLowerCase())
      );
    }
    // --- Kept this filter logic ---
    if (filters.location) {
      allJobs = allJobs.filter(job =>
        job.locationString.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    setFilteredJobs(allJobs);
  }, [filters, jobs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header onSync={handleSyncJobs} />
      
      <main className="container mx-auto p-4 md:p-8">
        <SearchBar filters={filters} onFilterChange={handleFilterChange} />
        <JobList jobs={filteredJobs} loading={loading} />
      </main>
    </div>
  );
}