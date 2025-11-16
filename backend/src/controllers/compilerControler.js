import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Get the credentials from your .env file
const JDOODLE_CLIENT_ID = process.env.JDOODLE_CLIENT_ID;
const JDOODLE_CLIENT_SECRET = process.env.JDOODLE_CLIENT_SECRET;

// JDoodle's API requires a language name and a version index
// This map translates the language name from your frontend
const JDOODLE_LANGUAGE_MAP = {
  javascript: {
    language: 'nodejs',
    versionIndex: '4' // Node.js 18.15.0
  },
  python: {
    language: 'python3',
    versionIndex: '4' // Python 3.11.2
  },
  java: {
    language: 'java',
    versionIndex: '4' // JDK 17.0.6
  },
  cpp: {
    language: 'cpp17',
    versionIndex: '1' // g++ 12.2.0
  },
  c: {
    language: 'c',
    versionIndex: '5' // gcc 12.2.0
  }
};

export const handleCompile = async (req, res) => {
  // We now expect 'language', 'code', and 'input' from the frontend
  const { language, code, input } = req.body;

  // 1. --- Basic Validation ---
  if (!code) {
    return res.status(400).json({ message: 'Code is required.' });
  }

  const langDetails = JDOODLE_LANGUAGE_MAP[language];
  if (!langDetails) {
    return res.status(400).json({
      message: `Language '${language}' is not supported.`,
    });
  }
  
  if (!JDOODLE_CLIENT_ID || !JDOODLE_CLIENT_SECRET) {
     return res.status(500).json({
       message: 'Compiler API is not configured. Missing Client ID or Secret.',
     });
  }

  // 2. --- Prepare the API Request for JDoodle ---
  const requestBody = {
    clientId: JDOODLE_CLIENT_ID,
    clientSecret: JDOODLE_CLIENT_SECRET,
    script: code,
    stdin: input || '',
    language: langDetails.language,
    versionIndex: langDetails.versionIndex,
  };

  const options = {
    method: 'POST',
    url: 'https://api.jdoodle.com/v1/execute',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestBody,
  };

  // 3. --- Call the API and Handle Response ---
  try {
    // Send the request to the JDoodle API
    const response = await axios.request(options);

    // Send the response from JDoodle (which includes 'output', 'statusCode', 'memory', 'cpuTime')
    // The frontend will handle this new response format.
    return res.status(200).json(response.data);

  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    
    // Check for JDoodle's "exceeded credits" error
    if (error.response?.data?.error?.includes('exceeded')) {
       return res.status(429).json({
         message: 'Compiler quota exceeded. Please try again later.',
         error: error.response.data.error,
       });
    }

    // Send a generic error
    return res.status(error.response?.status || 500).json({
      message: 'An error occurred while communicating with the compiler service.',
      error: error.response?.data?.error || error.message,
    });
  }
};