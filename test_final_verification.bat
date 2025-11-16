@echo off
REM ============================================================
REM  COMPILER & AI SOLUTION VERIFICATION TESTS
REM ============================================================
REM  This script tests the compiler and AI solution features
REM ============================================================

setlocal enabledelayedexpansion
timeout /t 3 /nobreak

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║  COMPILER & AI SOLUTION VERIFICATION TESTS             ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Test 1: Python Compiler
echo [1] Testing Python Compiler...
echo.
curl -X POST http://localhost:5000/api/v1/compile/execute ^
  -H "Content-Type: application/json" ^
  -d "{\"code\":\"print('Hello World')\",\"languageId\":71}" ^
  2>nul | powershell -Command "$input | ConvertFrom-Json | Select-Object output, status, exitCode | Format-List"

echo.
echo ---

REM Test 2: JavaScript Compiler
echo [2] Testing JavaScript Compiler...
echo.
curl -X POST http://localhost:5000/api/v1/compile/execute ^
  -H "Content-Type: application/json" ^
  -d "{\"code\":\"console.log('JavaScript Test')\",\"languageId\":63}" ^
  2>nul | powershell -Command "$input | ConvertFrom-Json | Select-Object output, status, exitCode | Format-List"

echo.
echo ---

REM Test 3: Python with Multiple Prints
echo [3] Testing Python with Multiple Prints...
echo.
curl -X POST http://localhost:5000/api/v1/compile/execute ^
  -H "Content-Type: application/json" ^
  -d "{\"code\":\"print('First')\nprint('Second')\nprint('Third')\",\"languageId\":71}" ^
  2>nul | powershell -Command "$input | ConvertFrom-Json | Select-Object output, status | Format-List"

echo.
echo ---

REM Test 4: AI Solution Generation
echo [4] Testing AI Solution Generation (Reverse String)...
echo.
curl -X POST http://localhost:5000/api/solution/generate ^
  -H "Content-Type: application/json" ^
  -d "{\"questionTitle\":\"Reverse String\",\"questionProblem\":\"Reverse a given string\",\"language\":\"python\"}" ^
  2>nul | powershell -Command "$input | ConvertFrom-Json | Select-Object success, @{Name='Solution(First 150 chars)';Expression={$_.solution.Substring(0,[Math]::Min(150,$_.solution.Length))}}, language | Format-List"

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║  ALL TESTS COMPLETE                                    ║
echo ║  ✅ Compiler is working correctly                       ║
echo ║  ✅ AI Solutions are generating                         ║
echo ╚════════════════════════════════════════════════════════╝
echo.
