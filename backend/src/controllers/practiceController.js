import PracticeQuestion from '../models/practiceQuestionModel.js';
// --- **** MODIFICATION 1: Import BOTH AI generators **** ---
import { 
  callGeminiCodingGenerator, 
  callGeminiAptitudeGenerator 
} from './aiController.js';

// --- Helper Functions ---

function mapRoundToDifficulty(roundStr) {
  if (!roundStr) return 'Medium';
  const lowerRound = roundStr.toLowerCase();
  
  if (lowerRound.includes('easy') || lowerRound.includes('screening') || lowerRound.includes('cognitive')) return 'Easy';
  if (lowerRound.includes('hard') || lowerRound.includes('final') || lowerRound.includes('system')) return 'Hard';
  if (lowerRound.includes('medium') || lowerRound.includes('technical')) return 'Medium';
  
  return 'Medium'; // Default for behavioral, etc.
}

// --- **** MODIFICATION 2: NEW Helper to get round TYPE **** ---
// This is the *key* logic to decide which AI to call
function getRoundType(roundStr) {
  const lowerRound = roundStr.toLowerCase();
  
  // Keywords for CODING rounds
  if (lowerRound.includes('coding') || lowerRound.includes('technical')) {
    return 'Coding';
  }
  
  // Keywords for APTITUDE/MCQ rounds
  if (lowerRound.includes('behavioral') || 
      lowerRound.includes('cognitive') || 
      lowerRound.includes('psychometric') || 
      lowerRound.includes('communication') ||
      lowerRound.includes('aptitude') ||
      lowerRound.includes('foundation') ||
      lowerRound.includes('verbal') ||
      lowerRound.includes('reasoning')) {
    return 'Aptitude';
  }

  // Default to Coding if unsure
  console.warn(`Unknown round type: "${roundStr}". Defaulting to Coding.`);
  return 'Coding';
}

function getEstimatedTime(questionCount, difficulty, roundStr) {
  // Use the new getRoundType function to be more accurate
  const roundType = getRoundType(roundStr); 
  let timePerQuestion;

  if (roundType === 'Aptitude') {
    timePerQuestion = 2; // 2 minutes per aptitude/behavioral/cognitive question
  } else { // 'Coding'
    const codingTimeMap = { 'Easy': 15, 'Medium': 30, 'Hard': 60 };
    timePerQuestion = codingTimeMap[difficulty] || 30;
  }
  
  const minutes = timePerQuestion * questionCount;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let formatted = '';
  if (hours > 0) {
    formatted += `${hours} hour${hours !== 1 ? 's' : ''} `;
  }
  if (remainingMinutes > 0) {
    formatted += `${remainingMinutes} minutes`;
  }
  if (formatted.trim() === '') {
    formatted = `${minutes} minutes`; // Handle cases like 0 hours
  }

  return {
    minutes,
    hours,
    formatted: formatted.trim()
  };
}


const parseQuestionCount = (numQuestionsStr) => {
  if (!numQuestionsStr) return 5; // Default to 5 if undefined
  const match = numQuestionsStr.match(/\d+/); // Find the first number
  return match ? parseInt(match[0], 10) : 5; // Default to 5 if no number found
};

// --- Main Controller Function ---

export const getPracticeQuestions = async (req, res) => {
  const { company, round } = req.query;
  const count = parseQuestionCount(req.query.count); // req.query.count is "45 Questions"

  if (!company || !round) {
    return res.status(400).json({ message: "Company and round are required" });
  }

  const normalizedCompany = company.toLowerCase().trim();
  const normalizedRound = round.toLowerCase().trim();

  try {
    // 1. Check for cached questions (no change)
    const cachedQuestions = await PracticeQuestion.findOne({
      company: normalizedCompany,
      round: normalizedRound
    });

    if (cachedQuestions) {
      console.log(`✅ CACHE HIT for: ${company} - ${round}`);
      const estimatedTime = getEstimatedTime(count, cachedQuestions.difficulty, normalizedRound);
      return res.json({
        success: true,
        message: 'Fetched from cache',
        company: company,
        round: round,
        difficulty: cachedQuestions.difficulty,
        count: count,
        problems: cachedQuestions.questions.slice(0, count), // Slice to the requested count
        estimatedTime: estimatedTime,
        source: 'cache-db'
      });
    } else {
      // 2. "Cache miss" - Generate new questions
      console.log(`⚠️ CACHE MISS for: ${company} - ${round}. Calling Gemini...`);
      const difficulty = mapRoundToDifficulty(round);
      
      // --- **** MODIFICATION 3: Smart AI Calling **** ---
      const roundType = getRoundType(normalizedRound);
      let generatedData;

      if (roundType === 'Aptitude') {
        console.log(`...Calling Aptitude Generator for round: ${round}`);
        generatedData = await callGeminiAptitudeGenerator(company, round, difficulty, count);
      } else {
        // Default to Coding for 'Coding', 'Technical', or unknown
        console.log(`...Calling Coding Generator for round: ${round}`);
        generatedData = await callGeminiCodingGenerator(company, round, difficulty, count);
      }
      // --- **** END MODIFICATION 3 **** ---
      
      if (!generatedData || !generatedData.problems) {
        throw new Error('AI failed to generate questions.');
      }
      
      const estimatedTime = getEstimatedTime(count, difficulty, normalizedRound);

      // 3. Save the *full set* to the cache
      const newQuestionSet = new PracticeQuestion({
        company: normalizedCompany,
        round: normalizedRound,
        difficulty: difficulty,
        questions: generatedData.problems, // Save the entire array
        estimatedTime: estimatedTime 
      });
      await newQuestionSet.save();
      console.log(`💾 CACHE SAVED for: ${company} - ${round}`);

      // 4. Return the new data
      res.json({
        success: true,
        message: 'Generated by AI and cached',
        company: company,
        round: round,
        difficulty: difficulty,
        count: generatedData.problems.length,
        problems: generatedData.problems,
        estimatedTime: estimatedTime,
        source: 'live-ai'
      });
    }
  } catch (error) {
    // Race condition fix (no changes)
    if (error.code === 11000) {
      console.log(`Race condition detected for: ${company} - ${round}. Another request saved first.`);
      try {
        const nowCachedQuestions = await PracticeQuestion.findOne({
          company: normalizedCompany,
          round: normalizedRound
        });

        if (nowCachedQuestions) {
          console.log(`✅ Served from cache on second attempt.`);
          const estimatedTime = getEstimatedTime(count, nowCachedQuestions.difficulty, normalizedRound);
          return res.json({
            success: true,
            message: 'Fetched from cache (after race condition)',
            company: company,
            round: round,
            difficulty: nowCachedQuestions.difficulty,
            count: count,
            problems: nowCachedQuestions.questions.slice(0, count),
            estimatedTime: estimatedTime,
            source: 'cache-db'
          });
        } else {
          throw new Error('Cache still empty after E11000 error.');
        }
      } catch (retryError) {
        return res.status(500).json({
          success: false,
          message: 'Failed to recover from cache race condition',
          error: retryError.message
        });
      }
    }
    
    // Other errors (no changes)
    console.error('❌ Error in getPracticeQuestions:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching practice questions',
      error: error.message
    });
  }
};