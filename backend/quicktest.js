#!/usr/bin/env node

/**
 * Quick Test Script for LeetCode API
 * Tests the backend endpoints without needing a browser
 * 
 * Run: node quicktest.js
 */

const axios = require('axios');

const API = 'http://localhost:5000';
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ️${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bold}${colors.blue}━━━━ ${msg} ━━━━${colors.reset}\n`),
};

async function test() {
  log.title('LEETCODE API QUICK TEST');
  
  try {
    // Test 1: Check if backend is running
    log.info('Testing backend connectivity...');
    try {
      await axios.get(`${API}/api/leetcode/companies`, { timeout: 5000 });
      log.success('Backend is running on port 5000');
    } catch (err) {
      log.error('Backend is not running!');
      log.info('Start backend with: cd backend && npm run dev');
      process.exit(1);
    }

    // Test 2: Get Companies
    log.title('TEST 1: Get Companies');
    const companiesRes = await axios.get(`${API}/api/leetcode/companies`);
    if (companiesRes.data?.companies?.length > 0) {
      log.success(`Found ${companiesRes.data.companies.length} companies`);
      console.log(`Companies: ${companiesRes.data.companies.slice(0, 5).join(', ')}...`);
    } else {
      log.error('No companies returned');
    }

    // Test 3: Get Rounds
    log.title('TEST 2: Get Interview Rounds');
    const roundsRes = await axios.get(`${API}/api/leetcode/rounds`);
    if (roundsRes.data?.rounds?.length > 0) {
      log.success(`Found ${roundsRes.data.rounds.length} rounds`);
      roundsRes.data.rounds.forEach((r) => {
        console.log(`  • ${r.name}: ${r.duration} min, ${r.difficulty}`);
      });
    } else {
      log.error('No rounds returned');
    }

    // Test 4: Get Questions (Google - Screening)
    log.title('TEST 3: Get Questions (Google - Screening)');
    const questionsRes = await axios.get(
      `${API}/api/leetcode/questions?company=Google&round=Screening&count=2`,
      { timeout: 15000 }
    );
    
    if (questionsRes.data?.problems?.length > 0) {
      log.success(`Fetched ${questionsRes.data.problems.length} questions`);
      console.log(`Company: ${questionsRes.data.company}`);
      console.log(`Round: ${questionsRes.data.round}`);
      console.log(`Source: ${questionsRes.data.source || 'unknown'}`);
      
      if (questionsRes.data.estimatedTime) {
        console.log(`Estimated Time: ${questionsRes.data.estimatedTime.formatted}`);
      }
      
      questionsRes.data.problems.forEach((q, i) => {
        console.log(`\n  ${i + 1}. ${q.title}`);
        console.log(`     Difficulty: ${q.difficulty}`);
        console.log(`     Acceptance: ${q.acRate?.toFixed(1)}%`);
        console.log(`     Topics: ${q.topicTags?.join(', ') || 'N/A'}`);
      });
    } else {
      log.error('No questions returned');
    }

    // Test 5: Create Session
    log.title('TEST 4: Create Test Session');
    const sessionRes = await axios.post(`${API}/api/leetcode/test-session`, {
      company: 'Google',
      round: 'Screening',
      questionCount: 2,
      userId: 'test-user'
    });

    if (sessionRes.data?.session?.sessionId) {
      log.success('Test session created');
      console.log(`Session ID: ${sessionRes.data.session.sessionId}`);
      console.log(`Status: ${sessionRes.data.session.status}`);
    } else {
      log.error('Failed to create session');
    }

    log.title('ALL TESTS COMPLETED SUCCESSFULLY');
    console.log(`
${colors.green}✨ Your LeetCode API is working! ✨${colors.reset}

Next steps:
1. Open http://localhost:5173 in your browser
2. Navigate to Job Analyzer
3. Enter company name (e.g., "Google")
4. Click "Get Prep Guide"
5. Click "📝 Practice" button on any round
6. Verify questions display with timer
    `);

  } catch (err) {
    log.error(`Test failed: ${err.message}`);
    if (err.response?.status === 400) {
      log.warn('Bad request - check query parameters');
    } else if (err.response?.status === 500) {
      log.warn('Server error - check backend logs');
    } else if (err.code === 'ECONNREFUSED') {
      log.warn('Connection refused - is backend running?');
    }
    process.exit(1);
  }
}

test();
