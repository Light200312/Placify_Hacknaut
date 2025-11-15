import express from 'express';
import axios from 'axios';

const router = express.Router();

// Compile and run code using Judge0
router.post('/execute', async (req, res) => {
  try {
    const { code, languageId, input } = req.body;

    if (!code || !languageId) {
      return res.status(400).json({ message: 'Code and language ID required' });
    }

    // Send code to Judge0 API
    const submission = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: code,
        language_id: languageId,
        stdin: input || '',
      },
      {
        headers: {
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );

    const result = submission.data;

    res.status(200).json({
      output: result.stdout || result.stderr || result.compile_output || 'No output',
      status: result.status.description,
      exitCode: result.exit_code,
      stderr: result.stderr,
      time: result.time,
      memory: result.memory,
    });
  } catch (error) {
    console.error('Compiler error:', error.message);
    res.status(500).json({
      message: 'Compilation failed',
      error: error.message,
    });
  }
});

// Language list
router.get('/languages', async (req, res) => {
  const languages = [
    { id: 50, name: 'C', extension: 'c' },
    { id: 54, name: 'C++', extension: 'cpp' },
    { id: 62, name: 'Java', extension: 'java' },
    { id: 71, name: 'Python', extension: 'py' },
    { id: 63, name: 'JavaScript', extension: 'js' },
  ];
  res.status(200).json(languages);
});

export default router;
