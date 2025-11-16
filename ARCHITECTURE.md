# 🏗️ LeetCode API Integration - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT BROWSER                                 │
│  http://localhost:5173                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                    React Frontend                                   │ │
│  │                                                                     │ │
│  │  JobAnalyzer Page                                                  │ │
│  │  └─ PrepGuideDisplay Component                                     │ │
│  │     ├─ Company Stats (Hiring Stats Cards)                          │ │
│  │     ├─ Rounds Table with [📝 Practice] buttons                     │ │
│  │     └─ Prep Links Modal                                            │ │
│  │                                                                     │ │
│  │     [Practice Button Click]                                        │ │
│  │            ↓                                                        │ │
│  │     ┌──────────────────────────────┐                              │ │
│  │     │  PracticeTest Modal Opens    │                              │ │
│  │     │  ┌──────────────────────┐    │                              │ │
│  │     │  │ Session Start Screen │    │                              │ │
│  │     │  │ - Company: Google    │    │                              │ │
│  │     │  │ - Round: Technical   │    │                              │ │
│  │     │  │ - Time: 60 minutes   │    │                              │ │
│  │     │  │ [🚀 Start Session]   │    │                              │ │
│  │     │  └──────────────────────┘    │                              │ │
│  │     └──────────────────────────────┘                              │ │
│  │            ↓                                                        │ │
│  │     ┌──────────────────────────────┐                              │ │
│  │     │  Test Interface Active       │                              │ │
│  │     │  ┌─────────────────────────┐ │                              │ │
│  │     │  │ Timer: 00:45:30        │ │                              │ │
│  │     │  ├─────────────────────────┤ │                              │ │
│  │     │  │ Question 2 of 5         │ │                              │ │
│  │     │  │ Progress: ████░░░░░ 40% │ │                              │ │
│  │     │  ├─────────────────────────┤ │                              │ │
│  │     │  │ Two Sum [Easy] 47.5%    │ │                              │ │
│  │     │  │ Topics: Array, Hash     │ │                              │ │
│  │     │  │                         │ │                              │ │
│  │     │  │ [📖 Open on LeetCode]   │ │                              │ │
│  │     │  │ [✓ Mark Done & Next]    │ │                              │ │
│  │     │  │ [1][2][3][4][5]         │ │                              │ │
│  │     │  └─────────────────────────┘ │                              │ │
│  │     └──────────────────────────────┘                              │ │
│  │                                                                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│                    HTTP Requests (Axios)                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │ GET /api/leetcode/questions?company=Google&round=Technical&count=5  │ │
│  │ GET /api/leetcode/companies                                          │ │
│  │ GET /api/leetcode/rounds                                             │ │
│  │ POST /api/leetcode/test-session (body: {company, round, count})      │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓ HTTP
┌─────────────────────────────────────────────────────────────────────────┐
│                       EXPRESS BACKEND                                    │
│  http://localhost:5000                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │               Routes Layer (leetcodeRoutes.js)                      │ │
│  │                                                                     │ │
│  │  GET  /api/leetcode/companies                                      │ │
│  │       └─→ getSupportedCompanies()                                  │ │
│  │                                                                     │ │
│  │  GET  /api/leetcode/rounds                                         │ │
│  │       └─→ getInterviewRounds()                                     │ │
│  │                                                                     │ │
│  │  GET  /api/leetcode/questions?company=X&round=Y&count=Z            │ │
│  │       └─→ getLeetcodeQuestions()                                   │ │
│  │                                                                     │ │
│  │  POST /api/leetcode/test-session                                   │ │
│  │       └─→ createTestSession()                                      │ │
│  │                                                                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    ↓                                      │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │          Controller Layer (leetcodeController.js)                   │ │
│  │                                                                     │ │
│  │  ┌──────────────────────────────────────────────────────────────┐ │ │
│  │  │ getLeetcodeQuestions(company, round, count)                  │ │ │
│  │  │                                                               │ │ │
│  │  │  1. Validate input parameters                                │ │ │
│  │  │  2. Try: Fetch from alfa-leetcode-api                        │ │ │
│  │  │  3. Process response (add metadata)                          │ │ │
│  │  │  4. Calculate estimated time                                 │ │ │
│  │  │  5. Return questions with metadata                           │ │ │
│  │  │                                                               │ │ │
│  │  │  On Error:                                                   │ │ │
│  │  │    └─→ getFallbackQuestions()                                │ │ │
│  │  │        (Return hardcoded questions)                          │ │ │
│  │  └──────────────────────────────────────────────────────────────┘ │ │
│  │                                                                     │ │
│  │  Other Functions:                                                  │ │
│  │  ├─ createTestSession(company, round, count, userId)              │ │
│  │  ├─ getSupportedCompanies()                                        │ │
│  │  ├─ getInterviewRounds()                                           │ │
│  │  ├─ getFallbackQuestions(company, round) [HARDCODED]              │ │
│  │  └─ getEstimatedTime(count, difficulty)                           │ │
│  │                                                                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    ↓                                      │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │               External API (Conditional)                            │ │
│  │                                                                     │ │
│  │  ┌─────────────────────────────────────────────────────┐           │ │
│  │  │ https://alfa-leetcode-api.vercel.app/api/problems   │           │ │
│  │  │                                                       │           │ │
│  │  │ Input:  ?companyTagName=Google&skip=0&limit=50     │           │ │
│  │  │                                                       │           │ │
│  │  │ Output: {                                             │           │ │
│  │  │   problems: [                                         │           │ │
│  │  │     {                                                 │           │ │
│  │  │       problemFrontendId: 1,                           │           │ │
│  │  │       title: "Two Sum",                               │           │ │
│  │  │       difficulty: "Easy",                             │           │ │
│  │  │       topicTags: ["Array", "Hash Table"],             │           │ │
│  │  │       acRate: 47.5,                                   │           │ │
│  │  │       url: "https://leetcode.com/problems/two-sum",   │           │ │
│  │  │       isPremium: false                                │           │ │
│  │  │     }                                                 │           │ │
│  │  │   ]                                                   │           │ │
│  │  │ }                                                     │           │ │
│  │  └─────────────────────────────────────────────────────┘           │ │
│  │                                                                     │ │
│  │  [API Fails or Timeout] ─→ Fallback to hardcoded ✓                │ │
│  │                                                                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓ HTTP Response
┌─────────────────────────────────────────────────────────────────────────┐
│                      Response to Frontend                                │
│                                                                           │
│  HTTP 200 OK                                                             │
│  {                                                                        │
│    "success": true,                                                      │
│    "company": "Google",                                                  │
│    "round": "Technical Round 1",                                         │
│    "difficulty": "Medium",                                               │
│    "count": 5,                                                           │
│    "problems": [                                                         │
│      {                                                                    │
│        "id": 1,                                                          │
│        "title": "Two Sum",                                               │
│        "difficulty": "Easy",                                             │
│        "topicTags": ["Array", "Hash Table"],                             │
│        "acRate": 47.5,                                                   │
│        "url": "https://leetcode.com/problems/two-sum",                   │
│        "isPremium": false                                                │
│      },                                                                   │
│      ...4 more questions...                                              │
│    ],                                                                     │
│    "estimatedTime": {                                                    │
│      "minutes": 60,                                                      │
│      "hours": "1hr"                                                      │
│    },                                                                     │
│    "generatedAt": "2024-01-15T10:30:00Z"                                │
│  }                                                                        │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
START
  ↓
User selects Company (Job Analyzer)
  ↓
Submits Prep Form
  ↓
Gets Prep Guide with Rounds Table
  ↓
Clicks "📝 Practice" Button on Round
  ↓
PracticeTest Component Mounts
  ├─ Fetches: GET /api/leetcode/questions?company=X&round=Y&count=5
  │
  └─ Response Received
     ├─ Questions: Array[5]
     ├─ Estimated Time: 60 minutes
     └─ Timer Duration: 60 * 60 = 3600 seconds
  ↓
Shows Modal:
├─ Company: Google
├─ Round: Technical Round 1
├─ Questions: 5
├─ Time: 00:60:00
└─ [🚀 Start Practice Session] Button
  ↓
User Clicks [🚀 Start]
  ↓
Timer Starts (interval: 1 second)
├─ Display: 00:59:59, 00:59:58, ...
├─ Check: < 5 minutes? → Change to RED
└─ Check: = 0? → Auto-end
  ↓
Question 1 Displays:
├─ Title
├─ Difficulty (color badge)
├─ Topics
├─ Acceptance Rate
├─ [📖 Open on LeetCode] Button
└─ [✓ Mark Done & Next] Button
  ↓
User Solves on LeetCode (opens in new tab)
  ↓
Returns to App
  ↓
Clicks [✓ Mark Done & Next]
  ↓
Progress Updates:
├─ Progress Bar: 1/5 (20%) → 2/5 (40%)
├─ Question Nav: [✓][2][3][4][5]
└─ Display: Question 2
  ↓
Repeat for Questions 3, 4, 5
  ↓
After Question 5 or Timer = 0:
├─ Show: "⏰ Time's up! You completed 5/5 questions."
└─ Offer: [✕ Exit Practice]
  ↓
User Clicks [✕ Exit Practice]
  ↓
Confirmation: "Are you sure? Progress will be lost"
  ├─ Click [Yes] → Close Modal, Return to JobAnalyzer
  └─ Click [No] → Continue Practicing
  ↓
END
```

---

## Component Hierarchy

```
App.jsx
├── Router
│   ├── JobAnalyzer Page
│   │   ├── Header
│   │   ├── Main Container
│   │   │   ├── Left Column
│   │   │   │   └── PrepGuideForm
│   │   │   │       └── Zustand Store: aiStore
│   │   │   │
│   │   │   └── Right Column
│   │   │       └── PrepGuideDisplay
│   │   │           ├── State: modalData
│   │   │           ├── State: practiceSession ← NEW
│   │   │           │
│   │   │           ├── Display Hiring Stats
│   │   │           │   └── StatCard (reusable)
│   │   │           │
│   │   │           ├── Display Rounds Table
│   │   │           │   ├── Round Name
│   │   │           │   ├── Assessment Type
│   │   │           │   ├── Question Count
│   │   │           │   ├── Duration
│   │   │           │   └── [📝 Practice] ← NEW Button
│   │   │           │       └── onClick: setPracticeSession({company, round})
│   │   │           │
│   │   │           ├── PrepLinksModal
│   │   │           │   └── Prep Links (Aptitude, Technical, Interview)
│   │   │           │
│   │   │           └── PracticeTest Modal ← NEW COMPONENT
│   │   │               ├── Conditional Render: !testStarted
│   │   │               │   └── Session Start Screen
│   │   │               │       ├── Company Display
│   │   │               │       ├── Round Display
│   │   │               │       ├── Question Count
│   │   │               │       ├── Estimated Time
│   │   │               │       ├── [🚀 Start Practice]
│   │   │               │       └── [✕ Cancel]
│   │   │               │
│   │   │               └── Conditional Render: testStarted
│   │   │                   ├── Header with Timer
│   │   │                   │   ├── Company & Round
│   │   │                   │   ├── Question Counter
│   │   │                   │   └── Timer Display (HH:MM:SS)
│   │   │                   │
│   │   │                   ├── Progress Bar
│   │   │                   │   ├── Completed / Total
│   │   │                   │   └── Percentage
│   │   │                   │
│   │   │                   ├── Question Display Area
│   │   │                   │   ├── Question Title
│   │   │                   │   ├── Difficulty Badge
│   │   │                   │   ├── Acceptance Rate
│   │   │                   │   ├── Topic Tags
│   │   │                   │   └── Question Description
│   │   │                   │
│   │   │                   ├── Action Buttons
│   │   │                   │   ├── [📖 Open on LeetCode]
│   │   │                   │   └── [✓ Mark Done & Next]
│   │   │                   │
│   │   │                   ├── Question Navigation
│   │   │                   │   └── [1] [2] [3] [4] [5]
│   │   │                   │       └── Color codes: Blue=Current, Green=Done, Gray=Not Started
│   │   │                   │
│   │   │                   └── Exit Button
│   │   │                       └── [✕ Exit Practice]
│   │   │                           └── Confirmation Dialog
│   │   │
│   │   └── Footer
│   │
│   └── Other Pages...
│
└── Providers
    └── AuthContext
```

---

## State Management

```
Zustand Store (aiStore)
├── prepGuideData
│   ├── company
│   ├── hiringStats
│   │   ├── jobOpenings
│   │   ├── applications
│   │   ├── testType
│   │   └── negativeMarking
│   ├── detailedRounds
│   │   ├── [0] { round, assessment, numQuestions, duration }
│   │   ├── [1] { ... }
│   │   └── ...
│   ├── prepLinks
│   │   ├── aptitude { description, preparationLinks[] }
│   │   ├── technical { ... }
│   │   └── interview { ... }
│   ├── topicsToFocusOn []
│   └── discussionThreads []
├── isFetchingPrepGuide (boolean)
└── prepGuideError (string | null)

Component State (PrepGuideDisplay)
├── modalData { title, links }
└── practiceSession { company, round } ← NEW

Component State (PracticeTest)
├── questions [] (from API)
├── currentQuestionIndex (number)
├── loading (boolean)
├── error (string | null)
├── timeLeft (seconds)
├── isRunning (boolean)
├── testStarted (boolean)
├── completedQuestions (Set<number>)
└── source ('leetcode' | 'hardcoded')
```

---

## Time Calculation Algorithm

```
┌─ Difficulty Level
│  ├─ Easy         → 15 minutes per question
│  ├─ Medium       → 30 minutes per question
│  ├─ Hard         → 60 minutes per question
│  └─ SystemDesign → 90 minutes per question
│
└─ Total Time = Σ (Question Count × Difficulty Time)

Example Calculations:

Screening (1 Easy):
  1 × 15 = 15 minutes

Technical Round 1 (2 Medium):
  2 × 30 = 60 minutes

Technical Round 2 (2 Hard):
  2 × 60 = 120 minutes

System Design (1 Hard):
  1 × 60 = 60 minutes

Final Round (2 Hard):
  2 × 60 = 120 minutes

Combined Session (5 Medium):
  5 × 30 = 150 minutes = 2 hours 30 minutes
```

---

## Error Handling Flow

```
Frontend Request
        ↓
Backend Receives Request
        ↓
Validate Parameters
├─ [FAIL] → Return 400 Bad Request
└─ [OK] ↓

Try: Fetch from alfa-leetcode-api
├─ [SUCCESS] → Return questions ✓
│
└─ [FAIL - Timeout/Error]
    ↓
    Fallback: Use hardcoded questions
    │
    ├─ Company in hardcoded list?
    │  ├─ [YES] → Return hardcoded questions ✓
    │  └─ [NO] → Return empty array or error message
    │
    └─ Catch Error → Return 500 Server Error

Frontend Receives Response
        ↓
Check: response.success === true
├─ [YES] → Display questions in PracticeTest
└─ [NO] → Show error message to user
```

---

This architecture ensures:
✅ Clean separation of concerns  
✅ Proper API design  
✅ Graceful error handling  
✅ Smooth user experience  
✅ Fallback reliability  

**Status**: Production Ready ✅
