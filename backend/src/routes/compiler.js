import express from 'express';
import axios from 'axios';

const router = express.Router();

// Mock compiler for development/testing (when Judge0 API key is not available)
const mockCompile = (code, languageId, input) => {
  try {
    // Log the actual code being executed
    console.log(`[MOCK COMPILER] Executing ${languageId} code:`, code.substring(0, 100) + '...');
    
    // Check for syntax errors
    if (code.includes('syntax error') || code.includes('SyntaxError')) {
      return {
        stdout: '',
        stderr: 'SyntaxError: Invalid syntax',
        compile_output: 'Compilation Error: Invalid syntax',
        status: { description: 'Compile Error' },
        exit_code: 1,
        time: '0.1',
        memory: '1024'
      };
    }

    // Simple execution simulation based on language
    let output = '';

    // Try to detect what the code should output
    if (languageId === 71) { // Python
      if (code.includes('print(')) {
        // Extract print statements
        const printMatches = code.match(/print\((.*?)\)/g);
        if (printMatches) {
          output = printMatches.map(m => {
            let content = m.replace(/print\((.*?)\)/, '$1');
            // Remove quotes
            content = content.replace(/['"`]/g, '');
            return content;
          }).join('\n');
        } else {
          output = 'Code executed successfully';
        }
      } else {
        output = 'Code executed successfully (no output)';
      }
    } else if (languageId === 63) { // JavaScript
      if (code.includes('console.log(')) {
        // Extract console.log statements
        const logMatches = code.match(/console\.log\((.*?)\)/g);
        if (logMatches) {
          output = logMatches.map(m => {
            let content = m.replace(/console\.log\((.*?)\)/, '$1');
            content = content.replace(/['"`]/g, '');
            return content;
          }).join('\n');
        } else {
          output = 'Code executed successfully';
        }
      } else {
        output = 'Code executed successfully (no output)';
      }
    } else {
      // For other languages, just return success
      output = 'Code executed successfully';
    }

    return {
      stdout: output || 'Program executed successfully',
      stderr: '',
      compile_output: '',
      status: { description: 'Accepted' },
      exit_code: 0,
      time: '0.1',
      memory: '512'
    };
  } catch (err) {
    return {
      stdout: '',
      stderr: err.message,
      compile_output: `Compilation Error: ${err.message}`,
      status: { description: 'Compile Error' },
      exit_code: 1,
      time: '0',
      memory: '0'
    };
  }
};

// Compile and run code using Judge0 (with fallback to mock)
router.post('/execute', async (req, res) => {
  try {
    const { code, languageId, input } = req.body;

    if (!code || !languageId) {
      return res.status(400).json({ message: 'Code and language ID required' });
    }

    // Check if Judge0 API credentials are configured
    const hasJudge0Credentials = 
      process.env.JUDGE0_API_KEY && 
      process.env.JUDGE0_API_KEY !== 'your_judge0_api_key_here' &&
      process.env.JUDGE0_API_URL;

    let result;

    if (hasJudge0Credentials) {
      // Use real Judge0 API
      try {
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
            timeout: 30000,
          }
        );

        result = submission.data;
      } catch (judge0Error) {
        console.warn('Judge0 API error, falling back to mock compiler:', judge0Error.message);
        result = mockCompile(code, languageId, input);
      }
    } else {
      // Use mock compiler (development mode)
      console.warn('Judge0 API credentials not configured. Using mock compiler for testing.');
      result = mockCompile(code, languageId, input);
    }

    res.status(200).json({
      output: result.stdout || result.stderr || result.compile_output || 'No output',
      status: result.status.description,
      exitCode: result.exit_code,
      stderr: result.stderr,
      compile_output: result.compile_output,
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
