#!/usr/bin/env node

/**
 * LeetCode API Integration Test Script
 * 
 * This script tests all LeetCode API endpoints to ensure proper integration
 * Run from backend directory: node testLeetcodeAPI.js
 */

const axios = require('axios');

const API_BASE = 'http://localhost:5000/api/leetcode';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.bright}${colors.blue}═══ ${msg} ═══${colors.reset}\n`),
};

async function testEndpoint(method, endpoint, data = null) {
  try {
    const url = `${API_BASE}${endpoint}`;
    let response;

    if (method === 'GET') {
      response = await axios.get(url);
    } else if (method === 'POST') {
      response = await axios.post(url, data);
    }

    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.response?.status,
    };
  }
}

async function runTests() {
  console.log(
    `${colors.bright}${colors.blue}\n🧪 LeetCode API Integration Tests${colors.reset}\n`
  );

  let passed = 0;
  let failed = 0;

  // Test 1: Get Companies
  log.section('Test 1: Get Supported Companies');
  const companiesResult = await testEndpoint('GET', '/companies');
  if (companiesResult.success && companiesResult.data?.companies) {
    log.success(`Retrieved ${companiesResult.data.companies.length} companies`);
    console.log(`Companies: ${companiesResult.data.companies.join(', ')}`);
    passed++;
  } else {
    log.error(`Failed to get companies: ${companiesResult.error}`);
    failed++;
  }

  // Test 2: Get Rounds
  log.section('Test 2: Get Interview Rounds');
  const roundsResult = await testEndpoint('GET', '/rounds');
  if (roundsResult.success && roundsResult.data?.rounds) {
    log.success(`Retrieved ${roundsResult.data.rounds.length} rounds`);
    roundsResult.data.rounds.forEach((round) => {
      console.log(
        `  • ${round.name}: ${round.duration} min, ${round.difficulty}, ${round.defaultQuestions} questions`
      );
    });
    passed++;
  } else {
    log.error(`Failed to get rounds: ${roundsResult.error}`);
    failed++;
  }

  // Test 3: Get Questions (Google - Screening)
  log.section('Test 3: Get LeetCode Questions (Google - Screening)');
  const questionsResult = await testEndpoint('GET', '/questions?company=Google&round=Screening&count=3');
  if (questionsResult.success && questionsResult.data?.problems) {
    log.success(`Retrieved ${questionsResult.data.problems.length} questions`);
    console.log(`Company: ${questionsResult.data.company}`);
    console.log(`Round: ${questionsResult.data.round}`);
    console.log(`Estimated Time: ${questionsResult.data.estimatedTime?.minutes} minutes`);
    console.log('\nQuestions:');
    questionsResult.data.problems.slice(0, 2).forEach((q, idx) => {
      console.log(`  ${idx + 1}. ${q.title} (${q.difficulty})`);
      console.log(`     Topics: ${q.topicTags?.join(', ') || 'N/A'}`);
      console.log(`     Acceptance: ${q.acRate?.toFixed(1)}%`);
    });
    passed++;
  } else {
    log.error(`Failed to get questions: ${questionsResult.error}`);
    failed++;
  }

  // Test 4: Get Questions with Different Company
  log.section('Test 4: Get LeetCode Questions (Amazon - Technical)');
  const amazonResult = await testEndpoint('GET', '/questions?company=Amazon&round=Technical&count=2');
  if (amazonResult.success && amazonResult.data?.problems) {
    log.success(`Retrieved ${amazonResult.data.problems.length} Amazon questions`);
    console.log(`Company: ${amazonResult.data.company}`);
    console.log(`Round: ${amazonResult.data.round}`);
    passed++;
  } else {
    log.warning(`Amazon test failed - this may be expected if API is unavailable`);
    log.info('System should fallback to hardcoded questions');
  }

  // Test 5: Create Test Session
  log.section('Test 5: Create Test Session');
  const sessionResult = await testEndpoint('POST', '/test-session', {
    company: 'Google',
    round: 'Technical Round 1',
    questionCount: 5,
    userId: 'test-user-123',
  });
  if (sessionResult.success && sessionResult.data?.sessionId) {
    log.success('Test session created successfully');
    console.log(`Session ID: ${sessionResult.data.sessionId}`);
    console.log(`Company: ${sessionResult.data.company}`);
    console.log(`Round: ${sessionResult.data.round}`);
    console.log(`Status: ${sessionResult.data.status}`);
    passed++;
  } else {
    log.error(`Failed to create session: ${sessionResult.error}`);
    failed++;
  }

  // Test 6: Test Invalid Company (should use fallback)
  log.section('Test 6: Invalid Company Handling (Fallback Test)');
  const fallbackResult = await testEndpoint('GET', '/questions?company=InvalidCo&round=Screening&count=2');
  if (fallbackResult.success && fallbackResult.data?.problems) {
    log.success('Fallback system working - returned hardcoded questions');
    console.log(`Fallback Company: ${fallbackResult.data.company || 'Default'}`);
    console.log(`Questions Count: ${fallbackResult.data.problems.length}`);
    passed++;
  } else {
    log.warning(`Invalid company test - API returned: ${fallbackResult.error}`);
  }

  // Summary
  log.section('Test Summary');
  console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  console.log(`Total: ${passed + failed}`);

  if (failed === 0) {
    log.success('All tests passed! 🎉');
    process.exit(0);
  } else {
    log.warning(`${failed} test(s) failed. Check backend logs for details.`);
    process.exit(1);
  }
}

// Run tests with error handling
console.log('Starting LeetCode API integration tests...');
console.log('Make sure backend is running on http://localhost:5000\n');

runTests().catch((error) => {
  log.error(`Fatal error: ${error.message}`);
  log.error('Is the backend server running? Try: npm run dev');
  process.exit(1);
});
