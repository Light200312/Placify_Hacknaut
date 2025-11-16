#!/bin/bash
# Compiler API Test Script for Linux/Mac

echo ""
echo "================================="
echo "Code Compiler API Test"
echo "================================="
echo ""

# Test 1: Python Hello World
echo "Test 1: Python Hello World"
echo ""
curl -X POST http://localhost:5000/api/v1/compile/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "print('"'"'Hello, World!'"'"')", "languageId": 71, "input": ""}'

echo ""
echo ""

# Test 2: JavaScript Code
echo "Test 2: JavaScript Code"
echo ""
curl -X POST http://localhost:5000/api/v1/compile/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "console.log('"'"'Test from JS'"'"')", "languageId": 63, "input": ""}'

echo ""
echo ""

# Test 3: Python with Input
echo "Test 3: Python with Input"
echo ""
curl -X POST http://localhost:5000/api/v1/compile/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "x = input()\nprint(f'"'"'You entered: {x}'"'"')", "languageId": 71, "input": "test123"}'

echo ""
echo ""

# Test 4: Syntax Error
echo "Test 4: Syntax Error Detection"
echo ""
curl -X POST http://localhost:5000/api/v1/compile/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "print('"'"'Missing quote", "languageId": 71, "input": ""}'

echo ""
echo "================================="
echo "Tests completed!"
echo "================================="
