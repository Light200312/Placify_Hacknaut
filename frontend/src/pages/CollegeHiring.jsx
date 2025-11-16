import React, { useState } from 'react';
import Header from '../components2/Home/Header';
import useAiStore from '../store/aiStore'; // Import your Zustand store
import PrepGuideDisplay from '../components/PrepGuideDisplay'; // Import the display component

// --- Configuration ---
const BACKEND_URL = 'http://localhost:5000';

// --- SVG Icons (for attractive UI) ---
const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M13.19 8.783a.5.5 0 0 1 0 .434l-2.005 2.005a.5.5 0 0 1-.707-.707l1.147-1.147-1.147-1.147a.5.5 0 0 1 .707-.707l2.005 2.005zm-6.07 3.51a.5.5 0 0 1 0-.434l2.005-2.005a.5.5 0 1 1 .707.707l-1.147 1.147 1.147 1.147a.5.5 0 1 1-.707.707l-2.005-2.005zm-1.11-6.892a.5.5 0 0 1 .434 0l2.005 2.005a.5.5 0 1 1-.707.707L6.6 7.05 5.454 8.196a.5.5 0 1 1-.707-.707l2.005-2.005z"/>
    <path d="M6.354 5.51a.5.5 0 0 0 0 .708l.707.707-.707.707a.5.5 0 0 0 .707.708l.707-.707.707.707a.5.5 0 0 0 .708-.708l-.707-.707.707-.707a.5.5 0 0 0-.708-.708l-.707.707-.707-.707a.5.5 0 0 0-.708 0z"/>
    <path d="M1.25 8A6.75 6.75 0 1 0 14.75 8 6.75 6.75 0 0 0 1.25 8zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
  </svg>
);

// Copied from your PrepLinksModal.js
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
    />
  </svg>
);


// --- React Components ---

/**
 * Loading Spinner Component
 */
const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
    <p className="ml-4 text-lg text-gray-300">Scanning the multiverse for career data...</p>
  </div>
);

/**
 * Company Card Component (MODIFIED)
 * - Added onSearchClick prop
 * - Added "Prep Guide" button
 */
const CompanyCard = ({ company, onSearchClick }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <h2 className="text-2xl font-semibold mb-3 text-blue-300">{company.name}</h2>
    
    <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Common Positions</h3>
    <ul className="mb-6 text-gray-300 space-y-1">
      {company.positions?.slice(0, 3).map((pos, index) => (
        <li key={index} className="text-sm">{pos}</li>
      )) || <li className="text-sm text-gray-500">Not specified</li>}
    </ul>

    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-700">
      <a
        href={company.website !== 'Not Found' ? `https://${company.website.replace(/^https?:\/\//, '')}` : '#'}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md ${company.website === 'Not Found' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
        aria-disabled={company.website === 'Not Found'}
      >
        <LinkIcon />
        Website
      </a>
      <a
        href={company.linkedin !== 'Not Found' ? company.linkedin : '#'}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md ${company.linkedin === 'Not Found' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
        aria-disabled={company.linkedin === 'Not Found'}
      >
        <LinkedInIcon />
        LinkedIn
      </a>
      {/* --- NEW BUTTON --- */}
      <button
        onClick={() => onSearchClick(company)}
        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
      >
        <SearchIcon />
        Prep Guide
      </button>
    </div>
  </div>
);

/**
 * Main App Component (MODIFIED)
 * - Added modal state
 * - Added modal handler functions
 * - Added modal JSX to render PrepGuideDisplay
 * - Hooked up Zustand actions
 */
function CollegeHiring() {
  const [collegeName, setCollegeName] = useState('');
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Modal and Prep Guide State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState('');
  const fetchPrepGuide = useAiStore((state) => state.fetchPrepGuide);
  
  // IMPORTANT: See note at the bottom about adding clearPrepGuideData to your store
  const clearPrepGuideData = useAiStore.getState().clearPrepGuideData;


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!collegeName.trim()) {
      setError('Please enter a college name.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setCompanies([]);

    try {
      const response = await fetch(`${BACKEND_URL}/api/colleges`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collegeName }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Something went wrong on the server.');
      }

      const data = await response.json();
      
      if (data.length === 0) {
        setError('No companies found for this college. The AI might be learning!');
      } else {
        setCompanies(data);
      }

    } catch (err) {
      console.error('Fetch error:', err);
      setError(`Failed to fetch data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Modal Handler Functions ---

  const handleSearchClick = (company) => {
    // Use the first position as the default role, or 'Software Engineer'
    const defaultRole = company.positions?.[0] || 'Software Engineer';
    
    // Fetch the prep guide data
    fetchPrepGuide(company.name, defaultRole);
    
    // Set state to open the modal
    setSelectedCompanyName(company.name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompanyName('');
    
    // Clear the prep guide data from the store so it's fresh next time
    if (clearPrepGuideData) {
      clearPrepGuideData();
    }
  };


  return (
    <div className="min-h-screen bg-gray-200 text-black font-sans">
      <Header />
      <div className="p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          
          {/* --- Header --- */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-700 bg-clip-text bg-gradient-to-r from-gray-100 to-purple-200 mb-3">
              Recruiter Radar
            </h1>
            <p className="text-lg text-gray-600">
              Discover companies that recruit at your college, powered by Gemini.
            </p>
          </header>

          {/* --- Search Form --- */}
          <form onSubmit={handleSubmit} className="flex justify-center mb-12 max-w-2xl mx-auto">
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              placeholder="Enter college or university name..."
              className="w-full px-5 py-3 bg-gray-200 border-2 border-gray-700 rounded-l-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-black rounded-r-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <SearchIcon />
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* --- Results Area --- */}
          <main>
            {isLoading && <Spinner />}
            
            {error && (
              <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-md max-w-lg mx-auto">
                <strong>Error:</strong> {error}
              </div>
            )}
            
            {companies.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company, index) => (
                  <CompanyCard 
                    key={index} 
                    company={company} 
                    onSearchClick={handleSearchClick} // Pass the handler
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* --- PREP GUIDE MODAL --- */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 backdrop-blur-sm"
          onClick={handleCloseModal} // Close modal on backdrop click
        >
          <div
            className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-700"
            onClick={(e) => e.stopPropagation()} // Prevent modal click from closing
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100">
                Prep Guide: {selectedCompanyName}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto">
              {/* PrepGuideDisplay will show the loading state and then the data */}
              <PrepGuideDisplay />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollegeHiring;