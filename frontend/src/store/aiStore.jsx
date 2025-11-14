import { create } from 'zustand';
import api from '../services/api';

/**
 * Converts a file object to a base64 string
 */
const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        // Return only the base64 data part
        resolve(reader.result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
});

const useAiStore = create((set) => ({
  // --- State ---
  isParsing: false,
  isAnalyzing: false,
  isFetchingPrepGuide: false, // New
  results: null,
  parsedData: null,
  prepGuideData: null, // New
  parseError: null,
  analysisError: null,
  prepGuideError: null, // New

  // --- Actions ---

  /**
   * Calls the backend to parse a resume file.
   */
  parseResume: async (file) => {
    set({ isParsing: true, parseError: null, parsedData: null });
    try {
      const imageData = await toBase64(file);
      const mimeType = file.type;

      const response = await api.post('/parse-resume', { imageData, mimeType });
      
      set({ isParsing: false, parsedData: response.data, parseError: null });
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to parse resume';
      set({ isParsing: false, parseError: message, parsedData: null });
    }
  },

  /**
   * Calls the backend to analyze a job description against a profile.
   */
  analyzeJob: async (profileId, jobDescription) => {
    set({ isAnalyzing: true, analysisError: null, results: null });
    try {
      const response = await api.post('/analyze', { profileId, jobDescription });
      set({ isAnalyzing: false, results: response.data, analysisError: null });
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to analyze job';
      set({ isAnalyzing: false, analysisError: message, results: null });
    }
  },

  /**
   * --- NEW ---
   * Calls the backend to get a company-specific prep guide.
   */
  fetchPrepGuide: async (company, jobRole) => {
    set({ isFetchingPrepGuide: true, prepGuideError: null, prepGuideData: null });
    try {
      const response = await api.post('/prep-guide', { company, jobRole });
      set({ isFetchingPrepGuide: false, prepGuideData: response.data });
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch prep guide';
      set({ isFetchingPrepGuide: false, prepGuideError: message });
    }
  },

  /**
   * Clears the parsedData from the store after the form has consumed it.
   */
  clearParsedData: () => set({ parsedData: null }),

  /**
   * Clears any analysis errors.
   */
  clearAnalysisError: () => set({ analysisError: null }),
}));

export default useAiStore;