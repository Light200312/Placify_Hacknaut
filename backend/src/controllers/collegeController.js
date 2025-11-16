import College from '../models/collegeModel.js';
import dotenv from "dotenv";
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Fetches company data from the Gemini API.
 * Uses Google Search grounding for up-to-date information.
 */
async function fetchFromGemini(collegeName) {
  console.log(`Cache miss for ${collegeName}. Fetching from Gemini...`);

  const systemInstruction = `You are a helpful career services assistant. Your task is to find companies that recruit from a specific college. 
  Respond ONLY with a valid JSON array of objects. Do not include any other text, markdown formatting, or explanations.
  Each object in the array must have the following properties: "name", "website", "linkedin", and "positions" (which should be an array of strings).
  If you cannot find a URL, use "Not Found".`;

  const userQuery = `List the top 10-15 companies that recruit students from ${collegeName}. 
  For each company, provide its name, official website URL, official LinkedIn page URL, and a list of 3-5 common job positions they hire for (e.g., "Software Engineer Intern", "Business Analyst", "Marketing Associate").`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    tools: [{ "google_search": {} }], // Use Google Search for grounded, real-time data
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
  };

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Gemini API request failed: ${response.status} ${errorBody}`);
    }

    const result = await response.json();
    const candidate = result.candidates?.[0];
    
    if (!candidate || !candidate.content?.parts?.[0]?.text) {
      throw new Error('Invalid response structure from Gemini API.');
    }

    // Clean the text response which might be wrapped in markdown
    const rawText = candidate.content.parts[0].text;
    const jsonText = rawText.replace(/```json|```/g, '').trim();

    // Parse the cleaned JSON text
    const companiesData = JSON.parse(jsonText);
    return companiesData;

  } catch (error) {
    console.error('Error fetching from Gemini or parsing JSON:', error);
    throw new Error('Failed to get data from AI service.');
  }
}

/**
 * @desc    Get companies for a specific college (from cache or Gemini)
 * @route   POST /api/get-companies
 * @access  Public
 */
export const getCompanies = async (req, res) => {
  const { collegeName } = req.body;

  if (!collegeName) {
    return res.status(400).json({ error: 'College name is required.' });
  }

  // Cache duration: 1 day
  const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;
  const now = new Date();

  try {
    // 1. Check cache
    const cachedData = await College.findOne({ name: collegeName });

    if (cachedData && (now - cachedData.updatedAt < CACHE_DURATION_MS)) {
      // 2. Cache Hit: Return cached data
      console.log(`Cache hit for ${collegeName}.`);
      return res.json(cachedData.companies);
    }

    // 3. Cache Miss: Fetch new data from Gemini
    const companiesData = await fetchFromGemini(collegeName);

    // 4. Save new data to cache (upsert)
    const updatedCollege = await College.findOneAndUpdate(
      { name: collegeName },
      { companies: companiesData, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    // 5. Return new data
    res.json(updatedCollege.companies);

  } catch (error) {
    console.error('Error in /api/get-companies:', error.message);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};