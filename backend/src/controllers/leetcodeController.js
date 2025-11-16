import axios from 'axios';

const LEETCODE_API_BASE = 'https://alfa-leetcode-api.vercel.app/api';

/**
 * NEW HELPER: Guesses difficulty from a descriptive round string.
 */
function mapRoundToDifficulty(roundStr) {
  if (!roundStr) return 'Medium';
  const lowerRound = roundStr.toLowerCase();
  
  if (lowerRound.includes('easy') || lowerRound.includes('screening') || lowerRound.includes('cognitive')) return 'Easy';
  if (lowerRound.includes('hard') || lowerRound.includes('final') || lowerRound.includes('system')) return 'Hard';
  if (lowerRound.includes('medium') || lowerRound.includes('technical')) return 'Medium';
  
  return 'Medium'; // Default
}

/**
 * NEW HELPER: Guesses which fallback list to use from a round string.
 */
function mapRoundToFallbackKey(roundStr) {
  if (!roundStr) return 'Technical';
  const lowerRound = roundStr.toLowerCase();

  if (lowerRound.includes('screening') || lowerRound.includes('cognitive')) return 'Screening';
  if (lowerRound.includes('system')) return 'System Design';
  if (lowerRound.includes('technical') || lowerRound.includes('final')) return 'Technical';

  return 'Technical'; // Default
}


/**
 * Controller for LeetCode API integration
 * Generates practice questions based on company and interview round
 */

/**
 * GET /api/leetcode/questions
 * Fetch questions from alfa-leetcode-api based on difficulty and tags
 *  * Query Parameters:
 *   - company: Company name (e.g., "Google", "Microsoft", "Amazon")
 *   - round: Interview round (e.g., "Screening", "Technical", "System Design")
 *   - difficulty: 'Easy', 'Medium', 'Hard' (optional, derived from round)
 *   - count: Number of questions to fetch (default: 5)
 */
export const getLeetcodeQuestions = async (req, res) => {
  try {
    // count is now passed from the frontend, but we still keep a default
    const { company, round, count = 5, difficulty } = req.query;

    // Validate input
    if (!company || !round) {
      return res.status(400).json({
        message: "Company and round are required",
        example: { company: "Google", round: "Technical", count: 5 }
      });
    }

    console.log(`\n📚 === LEETCODE QUESTION REQUEST ===`);
    console.log(`Company: ${company}`);
    console.log(`Round: ${round}`); // e.g., "Technical Assessment (MCQs)"
    console.log(`Count: ${count}`);
    
    // --- NEW LOGIC ---
    // Map descriptive round to a difficulty, or use provided difficulty
    const mappedDifficulty = difficulty || mapRoundToDifficulty(round);
    console.log(`Difficulty: ${mappedDifficulty} (Derived from round)`);
    // --- END NEW LOGIC ---

    // Build tags from company name - match with LeetCode company tags
    const companyMap = {
      'Google': 'Google',
      'Amazon': 'Amazon',
      'Microsoft': 'Microsoft',
      'Apple': 'Apple',
      'Meta': 'Meta',
      'Netflix': 'Netflix',
      'Adobe': 'Adobe',
      'Oracle': 'Oracle',
      'Uber': 'Uber',
      'LinkedIn': 'LinkedIn',
      'Tesla': 'Tesla',
      'Airbnb': 'Airbnb',
      'Goldman Sachs': 'Goldman',
      'JP Morgan': 'JPMorgan',
      'Morgan Stanley': 'Morgan'
    };
    const companyTag = companyMap[company] || company;

    // Fetch from alfa-leetcode-api
    // The API format: /api/problems?limit=X&difficulty=Y&tags=TAG
    const apiUrl = `${LEETCODE_API_BASE}/problems`;
    
    console.log(`🌐 Fetching from: ${apiUrl}`);
    console.log(`Params: limit=${count}, difficulty=${mappedDifficulty}, tags=${companyTag}`);

    let response;
    try {
      response = await axios.get(apiUrl, {
        params: {
          limit: count,
          difficulty: mappedDifficulty,
          tags: companyTag
        },
        timeout: 10000
      });
    } catch (apiError) {
      console.error('❌ First API attempt failed, trying alternative format...');
      // Try alternative format without tags
      response = await axios.get(apiUrl, {
        params: {
          limit: count,
          difficulty: mappedDifficulty
        },
        timeout: 10000
      });
    }

    // Handle different response formats from alfa-leetcode-api
    let problems = [];
    if (response.data?.problemsetQuestionList?.length > 0) {
      problems = response.data.problemsetQuestionList;
      console.log('📋 Using problemsetQuestionList format');
    } else if (response.data?.problems?.length > 0) {
      problems = response.data.problems;
      console.log('📋 Using problems format');
    } else if (Array.isArray(response.data)) {
      problems = response.data;
      console.log('📋 Using array format');
    } else {
      console.warn('⚠️ Unexpected API response format, trying to extract data...');
      console.warn('Response keys:', Object.keys(response.data || {}));
      console.warn('Full response:', JSON.stringify(response.data).substring(0, 500));
      
      // Try to find problems in any property
      for (const [key, value] of Object.entries(response.data || {})) {
        if (Array.isArray(value) && value.length > 0) {
          problems = value;
          console.log(`📋 Found problems in "${key}" property`);
          break;
        }
      }
    }

    console.log(`✅ Fetched ${problems.length} problems from LeetCode API`);
    console.log(`📊 Difficulty: ${mappedDifficulty}`);

    // Transform problems to our format
    const transformedProblems = problems.slice(0, count).map((problem, index) => {
      // Handle different field name conventions
      const titleSlug = problem.titleSlug || problem.title?.toLowerCase().replace(/\s+/g, '-');
      return {
        id: problem.questionId || problem.id || problem.frontendQuestionId || `${index}`,
        title: problem.title || problem.questionTitle || 'Unknown Problem',
        difficulty: problem.difficulty || mappedDifficulty,
        company: company,
        round: round,
        topicTags: problem.topicTags || problem.tags || problem.categoryTitle || [],
        acRate: problem.acRate || problem.acceptanceRate || Math.random() * 50 + 25, // Generate realistic rate
        url: problem.link || problem.url || `https://leetcode.com/problems/${titleSlug}/`,
        isPremium: problem.isPaid || problem.isPremium || problem.premium || false,
        description: problem.description || 'See LeetCode for full description'
      };
    });

    console.log(`🎯 Returning ${transformedProblems.length} transformed problems`);

    // --- FIX: Handle API returning 0 problems ---
    if (transformedProblems.length === 0) {
      console.warn('⚠️ LeetCode API returned 0 problems, switching to fallback.');
      throw new Error('No problems found from live API');
    }
    // --- END FIX ---

    res.json({
      success: true,
      company,
      round,
      difficulty: mappedDifficulty,
      count: transformedProblems.length,
      problems: transformedProblems,
      estimatedTime: getEstimatedTime(transformedProblems.length, mappedDifficulty), // Use difficulty
      generatedAt: new Date().toISOString(),
      source: 'live-api'
    });

  } catch (error) {
    console.error('❌ Error fetching from LeetCode API:', error.message);
    console.error('Error details:', error.code || error.response?.status);
    
    // --- NEW FALLBACK LOGIC ---
    const requestedCount = parseInt(req.query.count) || 5;
    const fallbackKey = mapRoundToFallbackKey(req.query.round);
    const mappedDifficulty = mapRoundToDifficulty(req.query.round);
    
    // Return fallback hardcoded questions if API fails
    const fallbackQuestions = getFallbackQuestions(
      req.query.company,
      fallbackKey, // Use the mapped key e.g., "Technical"
      requestedCount
    );
    // --- END NEW FALLBACK LOGIC ---

    console.log(`⚠️ Fallback: Returning ${fallbackQuestions.length} hardcoded questions for key: ${fallbackKey}`);

    res.json({
      success: true, // Still success, just using fallback
      message: 'LeetCode API temporarily unavailable, using hardcoded questions',
      company: req.query.company,
      round: req.query.round,
      count: fallbackQuestions.length,
      problems: fallbackQuestions,
      estimatedTime: getEstimatedTime(fallbackQuestions.length, mappedDifficulty), // Use difficulty
      generatedAt: new Date().toISOString(),
      fallback: true,
      source: 'fallback-hardcoded'
    });
  }
};

/**
 * Fallback hardcoded questions by company and round
 */
function getFallbackQuestions(company, round, count) {
  const allQuestions = {
    'Google': {
      'Screening': [
        {
          id: '1',
          title: 'Two Sum',
          difficulty: 'Easy',
          company: 'Google',
          round: 'Screening',
          topicTags: ['Array', 'Hash Table'],
          acRate: 47.2,
          url: 'https://leetcode.com/problems/two-sum/'
        },
        {
          id: '2',
          title: 'Contains Duplicate',
          difficulty: 'Easy',
          company: 'Google',
          round: 'Screening',
          topicTags: ['Array', 'Hash Table'],
          acRate: 61.5,
          url: 'https://leetcode.com/problems/contains-duplicate/'
        },
        {
          id: '3',
          title: 'Valid Parentheses',
          difficulty: 'Easy',
          company: 'Google',
          round: 'Screening',
          topicTags: ['Stack', 'String'],
          acRate: 40.7,
          url: 'https://leetcode.com/problems/valid-parentheses/'
        },
        {
          id: '4',
          title: 'Best Time to Buy and Sell Stock',
          difficulty: 'Easy',
          company: 'Google',
          round: 'Screening',
          topicTags: ['Array', 'DP'],
          acRate: 52.8,
          url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'
        },
        {
          id: '5',
          title: 'Reverse String',
          difficulty: 'Easy',
          company: 'Google',
          round: 'Screening',
          topicTags: ['String', 'Two Pointers'],
          acRate: 79.2,
          url: 'https://leetcode.com/problems/reverse-string/'
        }
      ],
      'Technical': [
        {
          id: '6',
          title: 'Longest Substring Without Repeating Characters',
          difficulty: 'Medium',
          company: 'Google',
          round: 'Technical',
          topicTags: ['String', 'Sliding Window'],
          acRate: 33.5,
          url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/'
        },
        {
          id: '7',
          title: 'Binary Tree Level Order Traversal',
          difficulty: 'Medium',
          company: 'Google',
          round: 'Technical',
          topicTags: ['Tree', 'BFS'],
          acRate: 59.6,
          url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/'
        },
        {
          id: '8',
          title: 'LRU Cache',
          difficulty: 'Medium',
          company: 'Google',
          round: 'Technical',
          topicTags: ['Design', 'Hash Map'],
          acRate: 36.2,
          url: 'https://leetcode.com/problems/lru-cache/'
        },
        {
          id: '9',
          title: 'Merge K Sorted Lists',
          difficulty: 'Hard',
          company: 'Google',
          round: 'Technical',
          topicTags: ['Linked List', 'Divide & Conquer'],
          acRate: 42.8,
          url: 'https://leetcode.com/problems/merge-k-sorted-lists/'
        },
        {
          id: '10',
          title: 'Word Ladder II',
          difficulty: 'Hard',
          company: 'Google',
          round: 'Technical',
          topicTags: ['BFS', 'Graph'],
          acRate: 28.5,
          url: 'https://leetcode.com/problems/word-ladder-ii/'
        }
      ],
      'System Design': [
        {
          id: '11',
          title: 'Design a URL Shortener',
          difficulty: 'Hard',
          company: 'Google',
          round: 'System Design',
          topicTags: ['System Design', 'Database'],
          acRate: 35.0,
          url: 'https://www.youtube.com/results?search_query=design+url+shortener'
        },
        {
          id: '12',
          title: 'Design a Rate Limiter',
          difficulty: 'Hard',
          company: 'Google',
          round: 'System Design',
          topicTags: ['System Design', 'Algorithms'],
          acRate: 32.0,
          url: 'https://www.youtube.com/results?search_query=design+rate+limiter'
        },
        {
          id: '13',
          title: 'Design a Cache',
          difficulty: 'Hard',
          company: 'Google',
          round: 'System Design',
          topicTags: ['System Design', 'Data Structures'],
          acRate: 38.0,
          url: 'https://www.youtube.com/results?search_query=design+cache+system'
        }
      ]
    },
    'Amazon': {
      'Screening': [
        {
          id: '101',
          title: 'Two Sum',
          difficulty: 'Easy',
          company: 'Amazon',
          round: 'Screening',
          topicTags: ['Array'],
          acRate: 47.2,
          url: 'https://leetcode.com/problems/two-sum/'
        },
        {
          id: '102',
          title: 'Palindrome Number',
          difficulty: 'Easy',
          company: 'Amazon',
          round: 'Screening',
          topicTags: ['Math'],
          acRate: 51.8,
          url: 'https://leetcode.com/problems/palindrome-number/'
        }
      ],
     'Technical': [
        {
          id: '103',
          title: 'Number of Islands',
          difficulty: 'Medium',
          company: 'Amazon',
          round: 'Technical',
          topicTags: ['Grid', 'DFS'],
          acRate: 55.3,
          url: 'https://leetcode.com/problems/number-of-islands/'
        },
        {
          id: '104',
          title: 'Alien Dictionary',
          difficulty: 'Hard',
          company: 'Amazon',
         round: 'Technical',
          topicTags: ['Graph', 'Topological Sort'],
          acRate: 31.0,
          url: 'https://leetcode.com/problems/alien-dictionary/'
        }
      ]
    },
    'Microsoft': {
      'Screening': [
        {
          id: '201',
          title: 'Plus One',
          difficulty: 'Easy',
          company: 'Microsoft',
          round: 'Screening',
          topicTags: ['Array', 'Math'],
          acRate: 41.5,
          url: 'https://leetcode.com/problems/plus-one/'
        }
      ],
      'Technical': [
        {
          id: '202',
          title: 'Minimum Window Substring',
          difficulty: 'Hard',
          company: 'Microsoft',
          round: 'Technical',
          topicTags: ['String', 'Sliding Window'],
          acRate: 32.5,
          url: 'https://leetcode.com/problems/minimum-window-substring/'
        }
      ]
    }
  };

  // Use the mapped round key here, e.g., 'Technical'
  const questions = allQuestions[company]?.[round] || allQuestions[company]?.['Technical'] || [];
  return questions.slice(0, count);
}

/**
 * Calculate estimated time for practicing questions
*/
function getEstimatedTime(questionCount, roundOrDifficulty) {
  // Use difficulty string now, not round
  const timePerQuestion = {
    'Easy': 15,
    'Medium': 30,
    'Hard': 60,
  };

  const minutes = (timePerQuestion[roundOrDifficulty] || 30) * questionCount;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return {
    minutes,
    hours,
    formatted: `${hours} hour${hours !== 1 ? 's' : ''}${remainingMinutes > 0 ? ` ${remainingMinutes} minutes` : ''}`
  };
}

/**
 * POST /api/leetcode/test-session
 * Create a test session with questions, timer, and tracking
 *  * Request Body:
 *   - company: Company name
 *   - round: Interview round
 *   - questionCount: Number of questions
 *   - userId: User ID (optional)
 */
export const createTestSession = async (req, res) => {
  try {
    const { company, round, questionCount = 5, userId } = req.body;

    if (!company || !round || !questionCount) {
      return res.status(400).json({
        message: "Company, round, and questionCount are required"
      });
    }

    console.log(`\n🧪 === TEST SESSION CREATED ===`);
    console.log(`Company: ${company}`);
    console.log(`Round: ${round}`);
    console.log(`Questions: ${questionCount}`);
    console.log(`User: ${userId || 'Anonymous'}`);
    console.log('================================\n');

    // Fetch questions for this session
    const questionsResponse = await getLeetcodeQuestions(
      {
        query: { company, round, count: questionCount }
      },
      { json: () => ({}) }
    );

    // Create session object
    const session = {
      sessionId: `session_${Date.now()}`,
      company,
      round,
      userId: userId || 'anonymous',
      questionCount,
      createdAt: new Date(),
      startTime: null,
      endTime: null,
      status: 'ready', // ready, active, completed
      questionsAttempted: 0,
      questionsCompleted: 0,
      accuracy: 0,
      timeSpent: 0
    };

    res.json({
      success: true,
      session,
      message: 'Test session created successfully'
    });

  } catch (error) {
    console.error('Error creating test session:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error creating test session',
      error: error.message
    });
  }
};

/**
 * GET /api/leetcode/companies
 * Get list of supported companies
 */
export const getSupportedCompanies = async (req, res) => {
CSS
  const companies = [
    'Google',
    'Amazon',
    'Microsoft',
    'Apple',
    'Meta',
    'Netflix',
    'Adobe',
    'Oracle',
    'Uber',
    'LinkedIn',
    'Tesla',
    'Airbnb',
    'Goldman Sachs',
   'JP Morgan',
    'Morgan Stanley'
  ];

  res.json({
    success: true,
    companies: companies.sort()
  });
};

/**
* GET /api/leetcode/rounds
 * Get interview rounds for job analysis
 */
export const getInterviewRounds = async (req, res) => {
  const rounds = [
    {
      name: 'Screening',
      description: 'Online coding challenge (Easy level)',
      duration: 60,
      questionCount: 1,
      difficulty: 'Easy'
  },
    {
      name: 'Technical Round 1',
      description: 'First technical interview (Medium level)',
      duration: 45,
      questionCount: 2,
      difficulty: 'Medium'
    },
    {
      name: 'Technical Round 2',
      description: 'Second technical interview (Hard level)',
      duration: 60,
      questionCount: 2,
      difficulty: 'Hard'
    },
    {
      name: 'System Design',
      description: 'System design interview (Hard level)',
      duration: 90,
      questionCount: 1,
      difficulty: 'Hard'
    },
    {
      name: 'Final Round',
      description: 'Final round with senior engineer (Hard level)',
      duration: 60,
      questionCount: 2,
      difficulty: 'Hard'
    }
  ];

  res.json({
    success: true,
    rounds
  });
};