@echo off
REM Testing Script for Compiler and AI Solution APIs

echo.
echo ================================
echo   Compiler & AI Solution Tests
echo ================================
echo.

REM Test 1: Check if backend is running
echo Test 1: Backend Health Check
curl -X GET http://localhost:5000/api/v1/compile/languages
echo.
echo.

REM Test 2: Test Python print statement
echo Test 2: Python Print Statement
curl -X POST http://localhost:5000/api/v1/compile/execute ^
  -H "Content-Type: application/json" ^
  -d "{\"code\": \"print('Hello from Hacknaut')\", \"languageId\": 71, \"input\": \"\"}"
echo.
echo.

REM Test 3: Test JavaScript console.log
echo Test 3: JavaScript Console.log
curl -X POST http://localhost:5000/api/v1/compile/execute ^
  -H "Content-Type: application/json" ^
  -d "{\"code\": \"console.log('Testing compiler');\", \"languageId\": 63, \"input\": \"\"}"
echo.
echo.

REM Test 4: Test AI Solution Generation
echo Test 4: AI Solution Generation (Gemini)
curl -X POST http://localhost:5000/api/solution/generate ^
  -H "Content-Type: application/json" ^
  -d "{\"questionTitle\": \"Reverse String\", \"questionProblem\": \"Reverse the given string\", \"language\": \"python\"}"
echo.
echo.

REM Test 5: Test Multiple Print Statements
echo Test 5: Multiple Print Statements
curl -X POST http://localhost:5000/api/v1/compile/execute ^
  -H "Content-Type: application/json" ^
  -d "{\"code\": \"print('Line 1')\\nprint('Line 2')\\nprint('Line 3')\", \"languageId\": 71, \"input\": \"\"}"
echo.
echo.

echo ================================
echo   All Tests Completed!
echo ================================
pause
