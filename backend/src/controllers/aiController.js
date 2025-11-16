import fetch from 'node-fetch';
import Profile from '../models/profileModel.js';
import dotenv from "dotenv"
// --- NEW IMPORTS ---
import crypto from 'crypto'; // For hashing the resume data
import PrepGuide from '../models/prepGuideModel.js';
import ParsedResume from '../models/parsedResumeModel.js';
// --- END NEW IMPORTS ---

dotenv.config();
// --- Configuration ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const GEMINI_API_KEY2 = process.env.GEMINI_API_KEY2 || ""; // <-- ADDED THIS
// --- AI Prompts and Schemas ---
function extractJson(text) {
  // First, try to find markdown-wrapped JSON
  const markdownMatch = text.match(/```json\n([\s\S]*?)\n```/);
  if (markdownMatch && markdownMatch[1]) {
    return markdownMatch[1];
  }
  
  // If no markdown, find the first '{' and last '}'
  const jsonMatch = text.match(/{[\s\S]*}/);
  if (jsonMatch && jsonMatch[0]) {
    return jsonMatch[0];
  }
  
  // If no JSON object is found
  console.warn("Could not extract JSON from text:", text);
  return null;
}

// --- AI Prompts and Schemas ---

const systemPrompt = `You are an expert technical recruiter and career coach specializing in placing Indian engineering students.
Your task is to analyze a student's profile against a specific job description and provide a realistic, scannable analysis.
You MUST return your answer in a valid JSON format.
You will be given the student's profile and the job description.
The profile's 'prepinstaScore' and 'indiaBixScore' are aptitude test scores out of 100.
The 'finalChanceScore' should be a weighted calculation: 60% based on the semantic match of skills/projects/experience to the job, and 40% based on their aptitude scores. A high GPA (above 8.5) should positively influence the score.
The 'suggestions' should be a list of 2-3 specific, actionable pieces of advice.

--- SKILL INFERENCE & NORMALIZATION RULES (VERY IMPORTANT) ---
Before you compare the profile to the job description, you MUST first create a new "Inferred Skill List" for the student by following these steps. This is not optional.

**Step 1: Normalize All Skills**
* All skills are case-insensitive. You MUST treat "css" and "CSS" as the same skill. You MUST treat "react" and "React" as the same skill.
* Treat common abbreviations as their full-stack equivalents.
    * "js" (or "JS") = "JavaScript"
    * "ts" (or "TS") = "TypeScript"

**Step 2: Expand Stack Acronyms**
* When you see a stack acronym, you MUST infer all its components.
    * "MERN" = "MongoDB", "Express", "React", "Node.js", "JavaScript"
    * "MEAN" = "MongoDB", "Express", "Angular", "Node.js", "JavaScript"
    * "PERN" = "PostgreSQL", "Express", "React", "Node.js", "JavaScript"

**Step 3: Expand Generalist Terms**
* Understand that general terms imply their components.
    * "Web Development" (or "Web dev") implies "HTML", "CSS", "JavaScript".
    * "Backend integration" (or "REST API Development") implies "RESTful APIs".

**Step 4: Compare**
* You MUST use this new, "Inferred Skill List" (which now includes "JavaScript", "HTML", "CSS", etc.) to compare against the job description's requirements.
* When you generate the 'matchingKeywords' and 'missingKeywords', you must use the normalized/expanded terms (e.g., list "JavaScript", not "js"; list "CSS", not "css").

--- EXAMPLE OF YOUR TASK ---
* **Profile Skills Input:** "MERN, web dev, css"
* **Job Description Input:** "Requires React, Node.js, and CSS."
* **Your Internal Inferred Skill List:** ["MongoDB", "Express", "React", "Node.js", "JavaScript", "HTML", "CSS"]
* **Analysis:** You see "React" and "Node.js" (from "MERN") and "CSS" (from "css" and "web dev").
* **Resulting JSON 'matchingKeywords':** ["React", "Node.js", "CSS"]
--- END OF EXAMPLE ---

--- END OF RULES ---

Your JSON output MUST follow this schema:
{
  "type": "object",
  "properties": {
    "finalChanceScore": { "type": "number" },
    "matchingKeywords": { "type": "array", "items": { "type": "string" } },
    "missingKeywords": { "type": "array", "items": { "type": "string" } },
    "suggestions": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["finalChanceScore", "matchingKeywords", "missingKeywords", "suggestions"]
}
`;

const resumeSchema = {
  "type": "object",
  "properties": {
    "skills": {
      "type": "string",
      "description": "A comma-separated list of all technical skills, programming languages, and frameworks found in the resume."
    },
    "projects": {
      "type": "string",
      "description": "A summary of the projects listed in the resume. Each project should be described in one or two sentences."
    },
    "experience": {
      "type": "string",
      "description": "A summary of the work and internship experience listed in the resume. Include company, role, and dates if available."
    }
  },
  "required": ["skills", "projects", "experience"]
};

// --- (PrepInsta-style Schema) ---
const prepGuideSchema = {
  "DoesNotExist":{"type": "Boolean" },
  "type": "object",
  "properties": {
    "hiringStats": {
      "type": "object",
      "description": "General hiring statistics for the company's graduate/entry-level roles.",
      "properties": {
        "jobOpenings": { "type": "string", "description": "e.g., '11,000' or 'TBD'" },
        "applications": { "type": "string", "description": "e.g., '3,10,000' or 'N/A'" },
        "testType": { "type": "string", "description": "e.g., 'Adaptive' or 'Non-Adaptive'" },
        "negativeMarking": { "type": "string", "description": "e.g., 'Yes' or 'No'" }
      }
    },
    "detailedRounds": {
      "type": "array",
      "description": "A detailed table-like breakdown of all online assessment and interview rounds.",
      "items": {
        "type": "object",
        "properties": {
          "round": { "type": "string", "description": "e.g., '1st Round' or '2nd Round'" },
          "assessment": { "type": "string", "description": "e.g., 'Cognitive Assessment (Gamified)' or 'Technical Assessment (MCQs)'" },
          "numQuestions": { "type": "string", "description": "e.g., '3 Questions' or '45 Questions'" },
          "duration": { "type": "string", "description": "e.g., '20 min' or '60 min'" }
        },
        "required": ["round", "assessment", "numQuestions", "duration"]
      }
    },
    "prepLinks": {
      "type": "object",
      "description": "Links for the three main preparation categories.",
      "properties": {
        "aptitude": {
          "type": "object",
          "properties": {
            "description": { "type": "string", "description": "Short description of the aptitude round." },
            "preparationLinks": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": { "title": { "type": "string" }, "url": { "type": "string" } },
                "required": ["title", "url"]
              }
            }
          }
        },
        "technical": {
          "type": "object",
          "properties": {
            "description": { "type": "string", "description": "Short description of the technical round." },
            "preparationLinks": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": { "title": { "type": "string" }, "url": { "type": "string" } },
                "required": ["title", "url"]
              }
            }
          }
        },
        "interview": {
         "type": "object",
          "properties": {
            "description": { "type": "string", "description": "Short description of the HR/Interview round." },
            "preparationLinks": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": { "title": { "type": "string" }, "url": { "type": "string" } },
                "required": ["title", "url"]
              }
            }
          }
        }
      }
    },
    "topicsToFocusOn": {
      "type": "array",
      "items": { "type": "string" },
      "description": "A list of key topics and skills to prepare for the specific role (e.g., 'Data Structures', 'System Design', 'Behavioral Questions')."
    },
    "discussionThreads": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "url": { "type": "string" }
        },
        "required": ["title", "url"]
      },
      "description": "A list of relevant discussion threads from sites like Reddit or Quora about the company's hiring process."
    }
  },
  "required": ["hiringStats", "detailedRounds", "prepLinks", "topicsToFocusOn", "discussionThreads"]
};


// --- (Updated Prep Guide Prompt) ---
const systemPromptPrepGuide = `You are a senior career coach and tech recruiter. Your task is to use Google Search to find the most up-to-date information about a company's hiring process and create a targeted preparation plan for a specific job role.

You MUST use the provided Google Search tool.

You MUST find specific, data-driven information matching the user's screenshot.
- **Hiring Statistics:** Find data on "Job Openings", "Applications", "Test Type", and "Negative Marking". If not available, use "N/A".
- **Detailed Rounds Table:** Find a breakdown of all assessment rounds, including "Assessment" name, "No. of Questions", and "Duration".
- **Preparation Links:** Find links for Aptitude, Technical, and Interview rounds. Prioritize links to **PrepInsta**, **IndiaBix**, **LeetCode**, and **GeeksforGeeks**.
- **Discussion Threads:** Find relevant **Reddit or Quora discussion threads** about the interview experience.
- **Topics to Focus On:** Summarize the key topics to study.

Your output must be a JSON object that strictly follows this schema:
${JSON.stringify(prepGuideSchema)}
if the company does not exist in rality, set "DoesNotExist" to true.AND leave everything empty.

--- IMPORTANT ---
Your response MUST be ONLY the valid JSON object. DO NOT include "json" or backticks. DO NOT add any introductory text or explanations.
`;

// --- NEW: System Prompt for Practice Questions ---
const systemPromptPracticeQuestions = `You are a LeetCode-style problem generator. Your task is to create a list of practice questions for an Indian engineering student interviewing at a specific company.
You will be given the company, the interview round, the desired difficulty, and the number of questions.
You MUST return *only* a valid JSON object. Do not include "json" or backticks.
The JSON MUST match this schema:
{
  "type": "object",
  "properties": {
    "problems": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "description": "A unique ID, e.g., 'p1'" },
          "title": { "type": "string", "description": "The problem title, e.g., 'Two Sum'" },
          "difficulty": { "type": "string", "description": "e.g., 'Easy', 'Medium', or 'Hard'" },
          "topicTags": { "type": "array", "items": { "type": "string" }, "description": "e.g., ['Array', 'Hash Table']" },
          "acRate": { "type": "number", "description": "A realistic acceptance rate, e.g., 47.2" },
          "url": { "type": "string", "description": "A valid LeetCode URL for a *similar* real problem" },
          "description": { "type": "string", "description": "A 1-2 sentence summary of the problem" }
        },
        "required": ["id", "title", "difficulty", "topicTags", "acRate", "url"]
      }
    }
  },
  "required": ["problems"]
}
Generate *exactly* the number of questions requested.
For the 'url', find a REAL LeetCode problem that matches the title and difficulty you generated.
`;

// --- AI API Helper Functions ---

/**
 * Calls the Gemini API for text analysis
 */
async function callGeminiAPI(userQuery) {
  // ... (existing function, no changes)
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;
  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      responseMimeType: "application/json",
    }
  };
  const geminiResponse = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!geminiResponse.ok) {
    const errorBody = await geminiResponse.text();
    console.error("Gemini API Error:", errorBody);
    throw new Error(`Gemini API request failed with status ${geminiResponse.status}`);
  }
  const geminiResult = await geminiResponse.json();
  if (geminiResult.candidates && geminiResult.candidates[0]?.content?.parts[0]?.text) {
    return JSON.parse(geminiResult.candidates[0].content.parts[0].text);
  } else {
    console.error("Gemini API Invalid Response:", geminiResult);
    throw new Error("Invalid response structure from Gemini API");
  }
}

/**
 * Calls the Gemini API with an image (multimodal) for resume parsing
 */
async function callGeminiVisionAPI(imageData, mimeType) {
  // ... (existing function, no changes)
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;
  const userQuery = `
  Please analyze this resume. Extract the user's skills, projects, and work/internship experience.
  Focus on technical skills. Summarize projects and experience.
  Return the result *only* as a JSON object matching the provided schema.
  `;
  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          { text: userQuery },
          {
            inlineData: {
              mimeType: mimeType,
              data: imageData 
            }
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: resumeSchema,
      temperature: 0.1 
    }
  };
  const maxRetries = 2; 
  const timeout = 60000; 
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal 
      });
      clearTimeout(timeoutId); 
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Gemini Vision Error (Attempt ${attempt}):`, errorBody);
        throw new Error(`Gemini Vision API request failed with status ${response.status}`);
      }
      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        return JSON.parse(result.candidates[0].content.parts[0].text); 
      } else {
        console.error("Gemini Vision Invalid Response:", result);
        throw new Error("Invalid response structure from Gemini Vision API");
      }
    } catch (error) {
      clearTimeout(timeoutId); 
      if (error.name === 'AbortError') {
        console.error(`Gemini Vision request timed out after ${timeout}ms (Attempt ${attempt})`);
        if (attempt === maxRetries) {
          throw new Error(`Gemini Vision request timed out after ${maxRetries} attempts.`);
        }
      } else if (error.code === 'ECONNRESET') {
        console.error(`Gemini Vision request failed with ECONNRESET (Attempt ${attempt})`);
        if (attempt === maxRetries) {
          throw new Error(`Gemini Vision request failed due to network error (ECONNRESET) after ${maxRetries} attempts.`);
s       }
      } else {
        throw error;
      }
    }
  }
}

/**
 * Calls the OpenRouter API (with Mixtral 8x22b)
 */
async function callOpenRouterAPI(userQuery) {
  // ... (existing function, no changes)
  const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  const payload = {
    model: 'mistralai/mixtral-8x22b-instruct',
    messages: [
      { "role": "system", "content": systemPrompt },
      { "role": "user", "content": userQuery }
    ],
    response_format: { "type": "json_object" },
    max_tokens: 1024 
  };
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorBody = await response.text();
    console.error("OpenRouter Error:", errorBody);
    throw new Error(`OpenRouter API request failed with status ${response.status}`);
  }
  const result = await response.json();
  if (result.choices && result.choices[0]?.message?.content) {
    return JSON.parse(result.choices[0].message.content);
  } else {
    console.error("OpenRouter Invalid Response:", result);
    throw new Error("Invalid response structure from OpenRouter API");
  }
}

/**
 * Calls the Gemini API with Google Search grounding to get a prep guide.
 */
async function callGeminiPrepGuide(company, jobRole) {
  // ... (existing function, no changes)
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;
  const userQuery = `Find the hiring process and create a preparation plan for a "${jobRole}" role at "${company}". Find specific data like number of questions, duration, test type, and hiring stats.`;
  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: {
      parts: [{ text: systemPromptPrepGuide }]
    },
    tools: [{ "google_search": {} }],
    generationConfig: {
      temperature: 0.2
    }
  };
  const maxRetries = 2;
  const timeout = 60000; 
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Prep Guide Error (Attempt ${attempt}):`, errorBody);
        throw new Error(`Prep Guide API request failed with status ${response.status}`);
      }
      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        const textResponse = result.candidates[0].content.parts[0].text;
        const jsonString = extractJson(textResponse);
        if (!jsonString) {
          console.error("Prep Guide - No JSON found in response:", textResponse);
          throw new Error("Invalid response structure from Prep Guide API (no JSON found)");
        }
        return JSON.parse(jsonString); 
      } else {
        console.error("Prep Guide Invalid Response:", result);
        throw new Error("Invalid response structure from Prep Guide API");
      }
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError' || error.code === 'ECONNRESET') {
        console.error(`Prep Guide request error (Attempt ${attempt}):`, error.message);
        if (attempt === maxRetries) {
          throw new Error(`Prep Guide request failed after ${maxRetries} attempts.`);
        }
      } else {
        throw error;
      }
    }
  }
}

// --- NEW: Function to Generate Practice Questions ---
/**
 * Calls Gemini API to generate LeetCode-style practice questions.
 * Uses GEMINI_API_KEY2.
 */
export async function callGeminiQuestionGenerator(company, round, difficulty, count) {
  // Check if the correct API key is set
  if (!GEMINI_API_KEY2) {
    throw new Error('GEMINI_API_KEY2 is not set in environment variables.');
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY2}`;
  
  const userQuery = `
    Company: "${company}"
    Interview Round: "${round}"
    Difficulty: "${difficulty}"
    Number of Questions: ${count}
    
    Please generate the JSON output.
  `;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: {
      parts: [{ text: systemPromptPracticeQuestions }]
    },
    generationConfig: {
      temperature: 0.5,
      responseMimeType: "application/json",
    }
  };

  // Using Robustness Logic from your other functions
  const maxRetries = 2;
  const timeout = 60000; // 60 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Question Generator Error (Attempt ${attempt}):`, errorBody);
        throw new Error(`Question Generator API request failed with status ${response.status}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        // The API is set to return JSON, but we'll parse the text just in case
        const textResponse = result.candidates[0].content.parts[0].text;
        try {
          return JSON.parse(textResponse);
        } catch (parseError) {
          console.error("Failed to parse JSON from AI response:", textResponse, parseError);
          throw new Error("AI returned invalid JSON.");
        }
      } else {
        console.error("Question Generator Invalid Response:", result);
        throw new Error("Invalid response structure from Question Generator API");
      }

    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError' || error.code === 'ECONNRESET') {
        console.error(`Question Generator request error (Attempt ${attempt}):`, error.message);
        if (attempt === maxRetries) {
          throw new Error(`Question Generator request failed after ${maxRetries} attempts.`);
s       }
      } else {
        throw error; // Non-retryable error
      }
    }
  }
}


// --- Controller Functions ---

/**
 * [POST] /api/parse-resume
 */
export const parseResume = async (req, res) => {
  // ... (existing function, no changes)
  const { imageData, mimeType } = req.body;
  if (!imageData || !mimeType) {
    return res.status(400).json({ message: 'imageData and mimeType are required' });
  }
  try {
    const resumeHash = crypto.createHash('sha256').update(imageData).digest('hex');
    const cachedResume = await ParsedResume.findOne({ resumeHash });
    if (cachedResume) {
      return res.status(200).json(cachedResume.parsedData);
    }
    const extractedData = await callGeminiVisionAPI(imageData, mimeType);
    const newResume = new ParsedResume({
      resumeHash: resumeHash,
      parsedData: extractedData
    });
    await newResume.save();
    res.status(200).json(extractedData);
  } catch (error) {
    console.error('Error parsing resume:', error);
    res.status(500).json({ message: 'Error parsing resume', error: error.message });
  }
};
/**
 * [POST] /api/analyze
 */
export const analyzeJob = async (req, res) => {
  // ... (existing function, no changes)
  const { profileId, jobDescription } = req.body;
  if (!profileId || !jobDescription) {
    return res.status(400).json({ message: 'profileId and jobDescription are required' });
  }
  try {
    const profile = await Profile.findOne({ profileId: profileId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found. Please save your profile first.' });
    }
    const userQuery = `
    Here is the student profile:
    ${JSON.stringify(profile)}
    
    Here is the job description:
    "${jobDescription}"
    
    Please provide the JSON analysis.
    `;
    const results = await Promise.allSettled([
      callGeminiAPI(userQuery),
      callOpenRouterAPI(userQuery)
    ]);
    const geminiResult = results[0].status === 'fulfilled'
      ? results[0].value
      : { error: results[0].reason.message };
    const openRouterResult = results[1].status === 'fulfilled'
      ? results[1].value
      : { error: results[1].reason.message };
    res.status(200).json({
      geminiResult,
      openRouterResult
    });
  } catch (error) {
    console.error('Error in AI analysis orchestration:', error);
    res.status(500).json({ message: 'Error analyzing job', error: error.message });
  }
};

/**
 * [POST] /api/prep-guide
 */
export const getPrepGuide = async (req, res) => {
  // ... (existing function, no changes)
  const { company, jobRole } = req.body;
  if (!company || !jobRole) {
    return res.status(400).json({ message: 'Company and Job Role are required' });
  }
  const normalizedCompany = company.toLowerCase().trim();
  const normalizedJobRole = jobRole.toLowerCase().trim();
  try {
    const cachedGuide = await PrepGuide.findOne({ 
      company: normalizedCompany, 
      jobRole: normalizedJobRole 
    });
    if (cachedGuide) {
      return res.status(200).json({ ...cachedGuide.guideData, company });
    }
    const prepGuideData = await callGeminiPrepGuide(company, jobRole);
    const newGuide = new PrepGuide({
      company: normalizedCompany,
      jobRole: normalizedJobRole,
      guideData: prepGuideData
    });
    await newGuide.save();
    res.status(200).json({ ...prepGuideData, company });
  } catch (error) {
    console.error('Error getting prep guide:', error);
    res.status(500).json({ message: 'Error getting prep guide', error: error.message });
  }
};