import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for data fetching
import Header from '../components2/Home/Header';
import Footer from '../components2/Home/Footer';

// --- NEW: API URL Constant ---
// Note: Using 5001 to match your backend server's port
const API_URL = 'http://localhost:5000';

// --- React Components ---

/**
 * PageHeader Component (Local to this page)
 * Displays the main title, Sync button, and Search form
 */
function PageHeader({ onSync, onSearch, isSearching }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery, searchLocation);
      setSearchQuery('');
      setSearchLocation('');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 md:px-8">
        {/* Title and Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Job Aggregator Portal
            </h1>
            <p className="text-gray-600">Find Govt & Private Jobs</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSync}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              ↻ Sync Default Jobs
            </button>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">🔍 Search Adzuna API</h2>
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., React Developer, Data Scientist"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Location (optional, default: India)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={isSearching}
              className={`px-6 py-2 rounded-md font-semibold text-white transition-colors ${
                isSearching
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSearching ? '⏳ Searching...' : '🚀 Search'}
            </button>
          </form>
          <p className="text-xs text-gray-600 mt-2">
            💡 Search Adzuna API for new jobs. Results will be added to the database.
          </p>
        </div>
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
 * Displays a single job listing with all available details.
 */
function JobCard({ job }) {
  // Determine tag color based on the job source
  const sourceTagColor = job.source.includes('Govt')
    ? 'bg-blue-100 text-blue-800'
    : 'bg-green-100 text-green-800';

  // Format salary range
  const formatSalary = (min, max) => {
    if (!min && !max) return null;
    const minStr = min ? `₹${(min / 100000).toFixed(1)}L` : '';
    const maxStr = max ? `₹${(max / 100000).toFixed(1)}L` : '';
    if (min && max) return `${minStr} - ${maxStr}`;
    return min ? minStr : maxStr;
  };

  const salaryRange = formatSalary(job.salaryMin, job.salaryMax);

  // Format job type
  const jobTypeDisplay = job.jobType
    ? job.jobType.replace(/_/g, ' ').charAt(0).toUpperCase() + job.jobType.slice(1).replace(/_/g, ' ')
    : 'Full Time';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 ease-in-out mb-6">
      <div className="p-6">
        {/* Header with title and company */}
        <div className="mb-4 border-b pb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{job.title}</h3>
          <p className="text-md font-semibold text-blue-600 mb-2">{job.companyName}</p>
          {job.category && (
            <p className="text-xs text-gray-500 italic">{job.category}</p>
          )}
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${sourceTagColor}`}>
            {job.source}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
            📍 {job.locationString}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-700">
            ⏱️ {jobTypeDisplay}
          </span>
          {salaryRange && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
              💰 {salaryRange}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
          {job.description}
        </p>

        {/* Job Date */}
        {job.createdDate && (
          <p className="text-xs text-gray-400 mb-4">
            Posted: {new Date(job.createdDate).toLocaleDateString('en-IN')}
          </p>
        )}
      </div>

      {/* Action Button */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4 border-t">
        {job.redirectUrl ? (
          <a
            href={job.redirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
          >
            View Full Details &rarr;
          </a>
        ) : (
          <button
            disabled
            className="inline-flex items-center text-gray-400 font-semibold text-sm cursor-not-allowed"
          >
            Details Unavailable
          </button>
        )}
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
    location: ''
  });
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // This function fetches jobs from our backend
  const fetchJobs = async () => {
    try {
      setLoading(true);
      // Build query parameters from filters
      const params = {};
      if (filters.role) params.role = filters.role;
      if (filters.company) params.company = filters.company;
      if (filters.location) params.location = filters.location;
      
      console.log('📤 Sending filters to backend:', params);
      
      // --- UPDATED: Sending filters as query parameters ---
      const res = await axios.get(`${API_URL}/api/jobs`, { params });
      console.log('Jobs fetched successfully:', res.data);
      // Ensure res.data is an array
      const jobsData = Array.isArray(res.data) ? res.data : [];
      setJobs(jobsData);
      setFilteredJobs(jobsData);
      console.log(`Loaded ${jobsData.length} jobs`);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      // Still show empty array if fetch fails
      setJobs([]);
      setFilteredJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // This function triggers the backend to sync with Adzuna
  const handleSyncJobs = async () => {
    try {
      setLoading(true);
      console.log('Triggering manual sync...');
      // --- UPDATED: Using API_URL ---
      const res = await axios.post(`${API_URL}/api/jobs/sync`);
      console.log('Sync response:', res.data);
      // The sync endpoint returns the newly updated list of jobs
      const jobsData = Array.isArray(res.data) ? res.data : [];
      setJobs(jobsData);
      setFilteredJobs(jobsData);
      console.log(`Synced and loaded ${jobsData.length} jobs`);
    } catch (error) {
      console.error("Failed to sync jobs:", error);
      // Still try to fetch jobs on sync failure
      fetchJobs();
    } finally {
      setLoading(false);
    }
  };

  // This function searches Adzuna API for new jobs
  const handleSearchAdzuna = async (query, location) => {
    try {
      setIsSearching(true);
      console.log('🔎 Searching Adzuna API...');
      console.log(`Query: "${query}", Location: "${location || 'India'}"`);
      
      const res = await axios.post(`${API_URL}/api/jobs/search`, {
        query,
        location: location || 'India'
      });
      
      console.log('Search response:', res.data);
      // The search endpoint returns the newly found jobs
      const jobsData = Array.isArray(res.data) ? res.data : [];
      setJobs(jobsData);
      setFilteredJobs(jobsData);
      console.log(`Found and loaded ${jobsData.length} jobs`);
      
      // Show success message
      alert(`✅ Found ${jobsData.length} jobs for "${query}"`);
    } catch (error) {
      console.error("Failed to search jobs:", error);
      alert('❌ Search failed. Check console for details.');
    } finally {
      setIsSearching(false);
    }
  };

  // Fetch jobs on initial component mount
  useEffect(() => {
    fetchJobs();
  }, []); // Empty dependency array means this runs only once on mount

  // This effect re-runs when filters change and fetches filtered jobs from backend
  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <PageHeader 
        onSync={handleSyncJobs} 
        onSearch={handleSearchAdzuna}
        isSearching={isSearching}
      />
      
      <main className="container mx-auto p-4 md:p-8">
        <SearchBar filters={filters} onFilterChange={handleFilterChange} />
        <JobList jobs={filteredJobs} loading={loading} />
      </main>

      <Footer />
    </div>
  );
}