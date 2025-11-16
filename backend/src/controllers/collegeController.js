import College from '../models/collegeModel.js';
import dotenv from "dotenv";
import { callGeminiVisionForParsing } from './aiController.js'; 
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

const placementDataSchema = {
  type: "object",
  properties: {
    rounds: {
      type: "array",
      items: {
        type: "object",
        properties: {
          roundName: { type: "string", description: "e.g., 'Aptitude Round' or 'Technical Round 1'" },
          roundType: { type: "string", enum: ['aptitude', 'technical', 'communication'], description: "The type of test" },
          questions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                qId: { type: "string", description: "A unique ID for the question, e.g., 'apt1' or 'tech2'" },
                questionText: { type: "string", description: "The full text of the question" },
                options: { type: "array", items: { type: "string" }, description: "Array of 4 options (or empty for coding questions)" },
                correctAnswer: { type: "string", description: "The correct option text (or 'N/A' for coding)" },
                explanation: { type: "string", description: "A brief explanation for the answer (optional)" },
                type: { type: "string", enum: ['aptitude', 'technical', 'communication'], description: "Must match the roundType" }
              },
              required: ["qId", "questionText", "correctAnswer", "type"]
            }
          }
        },
        required: ["roundName", "roundType", "questions"]
      }
    }
  },
  required: ["rounds"]
};

const aiParsingPrompt = `You are a data entry specialist. Parse the entire attached file, which contains placement questions for a college. Extract all rounds and questions and format them *perfectly* into the provided JSON schema.
- 'roundType' must be one of: 'aptitude', 'technical', or 'communication'.
- For coding questions ('technical'), the 'options' array should be empty and 'correctAnswer' should be the required solution function signature or pseudocode.
- For MCQs, 'options' must be an array of strings and 'correctAnswer' must be the *exact text* of the correct option.
- Ensure 'qId' is unique for each question within its round.`;
export const uploadPlacementData = async (req, res) => {
  const { collegeName } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  if (!collegeName) {
    return res.status(400).json({ message: 'College name is required.' });
  }

  try {
    console.log(`Received file for ${collegeName}. Sending to AI for parsing...`);
    
    // 1. Call AI to parse the file
    const parsedData = await callGeminiVisionForParsing(
      req.file.buffer,
      req.file.mimetype,
      aiParsingPrompt,
      placementDataSchema
    );

    if (!parsedData || !parsedData.rounds) {
      throw new Error('AI failed to return valid data. Check file format.');
    }
    
    console.log(`AI parsing successful. Saving ${parsedData.rounds.length} rounds to DB.`);

    // 2. Save the structured JSON to the college's record
    const updatedCollege = await College.findOneAndUpdate(
      { name: collegeName },
      { 
        $set: { placementData: parsedData.rounds }
      },
      { new: true, upsert: true } // Create the college if it doesn't exist
    );

    res.json({ 
      success: true, 
      message: `Successfully saved ${parsedData.rounds.length} rounds for ${updatedCollege.name}.`,
      data: updatedCollege.placementData 
    });

  } catch (error) {
    console.error('Error in uploadPlacementData:', error);
    res.status(500).json({ message: 'Error processing file.', error: error.message });
  }
};

// --- **** NEW FUNCTION: GET PLACEMENT QUESTIONS (Used by frontend) **** ---

/**
 * @desc    Get custom placement questions for a specific college and round
 * @route   GET /api/colleges/:collegeName/questions/:roundType
 * @access  Public
 */
export const getPlacementQuestions = async (req, res) => {
  const { collegeName, roundType } = req.params;

  try {
    const college = await College.findOne({ name: collegeName });

    if (!college || !college.placementData || college.placementData.length === 0) {
      // This is the signal for the frontend to fall back to generic/AI questions
      return res.status(404).json({ message: 'No custom placement data found for this college.' });
    }

    // Filter by roundType (e.g., 'technical')
    const matchingRounds = college.placementData.filter(
      round => round.roundType === roundType
    );

    if (matchingRounds.length === 0) {
      return res.status(404).json({ message: `No questions found for round type '${roundType}'.` });
    }

    // Combine questions from all matching rounds (e.g., "Technical Round 1" and "Technical Round 2")
    const questions = matchingRounds.flatMap(round => round.questions);

    // Return the custom questions in the format expected by PracticeTest.jsx
    // We map them to the 'problems' array name
    const problems = questions.map(q => ({
      id: q.qId,
      title: q.questionText.substring(0, 50) + '...', // Generate a short title
      difficulty: 'Custom', // Set a default difficulty
      questionText: q.questionText,
      options: q.options || [],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      // Add other necessary fields
    }));

    res.json({ success: true, problems: problems, source: 'db-custom' });

  } catch (error) {
    console.error('Error in getPlacementQuestions:', error);
    res.status(500).json({ message: 'Server error fetching questions.', error: error.message });
  }
};