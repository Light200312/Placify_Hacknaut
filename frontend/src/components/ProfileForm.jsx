import React, { useState, useEffect } from 'react';
import useAiStore from '../store/aiStore.jsx';
import api from '../services/api.js';
import LoadingButton from './LoadingButton.jsx';
import ResumeParser from './ResumeParser.jsx';

const ProfileForm = ({ onProfileSave }) => {
  const [profile, setProfile] = useState({
    profileId: '',
    gpa: '',
    prepinstaScore: '',
    indiaBixScore: '',
    skills: '',
    projects: '',
    experience: '',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: '', isError: false });

  // Get state and actions from the Zustand store
  // FIX: Select state values individually to prevent infinite loops.
  // Do not return a new object from the selector.
  const parsedData = useAiStore((state) => state.parsedData);
  const clearParsedData = useAiStore((state) => state.clearParsedData);
  const parseError = useAiStore((state) => state.parseError);

  // Effect to auto-fill form when resume data is parsed
  useEffect(() => {
    if (parsedData) {
      setProfile((prev) => ({
        ...prev,
        skills: parsedData.skills || prev.skills,
        projects: parsedData.projects || prev.projects,
        experience: parsedData.experience || prev.experience,
      }));
      // After consuming the data, clear it from the store
      clearParsedData();
      setSaveMessage({ text: 'Resume parsed! Please review and save.', isError: false });
    }
  }, [parsedData, clearParsedData]);

  // Effect to show parsing errors
  useEffect(() => {
    if (parseError) {
      setSaveMessage({ text: parseError, isError: true });
    }
    // This effect should only run when parseError changes.
  }, [parseError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.profileId) {
      setSaveMessage({ text: 'Profile ID is required.', isError: true });
      return;
    }
    
    setIsSaving(true);
    setSaveMessage({ text: '', isError: false });

    try {
      await api.post('/profile', profile);
      setIsSaving(false);
      setSaveMessage({ text: 'Profile saved successfully!', isError: false });
      onProfileSave(profile.profileId); // Lift the profileId up to HomePage
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to save profile';
      setIsSaving(false);
      setSaveMessage({ text: message, isError: true });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Your Profile</h2>
      
      <ResumeParser />
      
      {saveMessage.text && (
        <div className={`text-sm text-center mb-4 ${saveMessage.isError ? 'text-red-600' : 'text-green-600'}`}>
          {saveMessage.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="profileId" className="block text-sm font-medium text-gray-700">Profile ID (e.g., your email)</label>
          <input
            type="text"
            id="profileId"
            name="profileId"
            value={profile.profileId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="user@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="gpa" className="block text-sm font-medium text-gray-700">Overall GPA (out of 10)</label>
          <input
            type="number"
            id="gpa"
            name="gpa"
            value={profile.gpa}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="10"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="8.5"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="prepinstaScore" className="block text-sm font-medium text-gray-700">PrepInsta Score</label>
            <input
              type="number"
              id="prepinstaScore"
              name="prepinstaScore"
              value={profile.prepinstaScore}
              onChange={handleChange}
              min="0"
              max="100"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="75"
            />
          </div>
          <div>
            <label htmlFor="indiaBixScore" className="block text-sm font-medium text-gray-700">IndiaBix Score</label>
            <input
              type="number"
              id="indiaBixScore"
              name="indiaBixScore"
              value={profile.indiaBixScore}
              onChange={handleChange}
              min="0"
              max="100"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="80"
            />
          </div>
        </div>
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills (Comma-separated)</label>
          <textarea
            id="skills"
            name="skills"
            value={profile.skills}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="React, Node.js, Python, MongoDB, AWS"
          ></textarea>
        </div>
        <div>
          <label htmlFor="projects" className="block text-sm font-medium text-gray-700">Projects (Brief description)</label>
          <textarea
            id="projects"
            name="projects"
            value={profile.projects}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="Built an e-commerce site with MERN stack..."
          ></textarea>
        </div>
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience (Internships, etc.)</label>
          <textarea
            id="experience"
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="Software Engineer Intern at XYZ..."
          ></textarea>
        </div>
        <LoadingButton
          isLoading={isSaving}
          loadingText="Saving..."
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Save Profile
        </LoadingButton>
      </form>
    </div>
  );
};

export default ProfileForm;