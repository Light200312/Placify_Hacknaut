import React, { useState } from 'react';
import axios from 'axios';
import SuggestionCard from '../components/SuggestionCard.jsx';
import Header from '../components2/Home/Header.jsx'; // Adjust import path as needed
import Footer from '../components2/Home/Footer'; // Adjust import path as needed

const SuggestionsPage = () => {
  const [formData, setFormData] = useState({
    year: '3rd Year',
    branch: 'Computer Science',
    skills: ''
  });
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuggestions(null);

    try {
      // Replace with your actual backend URL
      const response = await axios.post('http://localhost:5000/api/suggestions/generate', formData);
      if (response.data.success) {
        setSuggestions(response.data.data);
      } else {
        setError('Failed to generate suggestions.');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-10 max-w-7xl">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Resource Generator</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get AI-tailored prompts for your projects and discover hidden gems of websites useful for your engineering journey.
          </p>
        </div>

        {/* --- Input Form --- */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 max-w-4xl mx-auto border border-gray-100">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select 
                value={formData.year} 
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
              <input 
                type="text" 
                placeholder="e.g. CSE, Mech, Civil"
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div className="md:col-span-1">
               <label className="block text-sm font-medium text-gray-700 mb-1">Top Skills</label>
               <input 
                type="text" 
                placeholder="e.g. React, Python"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
              ) : '✨ Generate'}
            </button>
          </form>
        </div>

        {/* --- Error Message --- */}
        {error && (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg mb-8 max-w-2xl mx-auto border border-red-200">
                {error}
            </div>
        )}

        {/* --- Results Section (Split Layout) --- */}
        {suggestions && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT: Prompts Column */}
            <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg text-2xl">🤖</div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">AI Power Prompts</h2>
                    <p className="text-sm text-gray-500">Copy these into ChatGPT or Claude</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {suggestions.prompts.map((prompt, index) => (
                  <SuggestionCard key={index} type="prompt" data={prompt} />
                ))}
              </div>
            </div>

            {/* RIGHT: Websites Column */}
            <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg text-2xl">🌐</div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Helpful Tools & Sites</h2>
                    <p className="text-sm text-gray-500">Handpicked resources for you</p>
                </div>
              </div>

              <div className="space-y-4">
                {suggestions.websites.map((site, index) => (
                  <SuggestionCard key={index} type="website" data={site} />
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default SuggestionsPage;