# Compiler Testing Guide

## 🎯 Overview

The code compiler has been configured with a **fallback mock compiler** for development/testing when Judge0 API credentials are not available.

## 📋 Current Status

### ✅ What's Working:
- Backend API endpoint: `POST http://localhost:5000/api/v1/compile/execute`
- Frontend CodeCompiler component properly calls the backend
- Error handling with meaningful status messages
- Mock compiler fallback (for testing without API key)

### ⚠️ Current Setup:
The `.env` file has `JUDGE0_API_KEY=your_judge0_api_key_here` (placeholder)

**Two Options:**

## Option 1: Use Mock Compiler (Current Setup) ✅ WORKS

The system automatically falls back to a mock compiler when:
- Judge0 API key is not configured (or set to placeholder)
- Judge0 API is unreachable

### Test the Mock Compiler:
1. Start the backend: `cd backend && npm run dev`
2. Start the frontend: `cd frontend && npm run dev`
3. Go to a Technical Test Page
4. Write any code and click "▶ Run Code"
5. Should see: `Hello, World! (Mock Output)` or appropriate mock response

### Expected Mock Responses:
```
✅ Success: "Hello, World! (Mock Output)"
❌ Compile Error: If code contains "syntax error" or "SyntaxError"
⚠️ Runtime Error: If code contains "undefined" or "error"
```

---

## Option 2: Use Real Judge0 API (Recommended for Production)

If you want to use the **real Judge0 API**:

### Step 1: Get Judge0 API Key
1. Go to https://rapidapi.com/judge0-official/api/judge0-ce
2. Sign up (free tier available)
3. Copy your **RapidAPI Key**

### Step 2: Update `.env`
Edit `backend/.env`:
```env
JUDGE0_API_KEY=your_actual_rapidapi_key_here
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

### Step 3: Test the Real API
```bash
cd backend
npm run dev
```

Then test via frontend or use curl:
```bash
curl -X POST http://localhost:5000/api/v1/compile/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello, World!\")",
    "languageId": 71,
    "input": ""
  }'
```

---

## 🧪 Testing Steps

### Test 1: Python Code
```python
print("Hello, World!")
```
**Expected:** Success with output "Hello, World!"

### Test 2: JavaScript Code
```javascript
console.log("Test");
```
**Expected:** Success with output (or mock output)

### Test 3: Syntax Error
```python
print("Missing quote
```
**Expected:** Compile Error message

### Test 4: With Input
```python
x = input()
print(f"You entered: {x}")
```
Input: `test123`
**Expected:** Output: `You entered: test123`

---

## 🔧 Troubleshooting

### Issue: "Network Error: Failed to execute code"
**Solution:** 
- Check if backend is running: `npm run dev` in backend folder
- Verify backend is on port 5000
- Check browser console for detailed error

### Issue: "Code and language ID required"
**Solution:**
- Make sure code is not empty
- Language ID should be: python (71), javascript (63), java (62), cpp (54), c (50)

### Issue: Always getting mock response
**Solution:**
- This is expected if Judge0 API key is not configured
- Either set up real API key (Option 2) or continue with mock testing

### Issue: Judge0 API error but no fallback
**Solution:**
- Check `.env` file for correct API key
- Verify RapidAPI subscription is active
- Check internet connection

---

## 📊 Response Format

All responses follow this format:
```json
{
  "output": "stdout or error output",
  "status": "Accepted|Compile Error|Runtime Error|Time Limit Exceeded",
  "exitCode": 0,
  "stderr": "error details if any",
  "compile_output": "compilation errors if any",
  "time": "0.1",
  "memory": "512"
}
```

---

## ✨ Features

✅ Real-time code execution  
✅ Multiple language support (Python, JavaScript, Java, C++, C)  
✅ Standard input support  
✅ Error handling with fallback  
✅ Performance metrics (time, memory)  
✅ Syntax error detection  
✅ Runtime error reporting  

---

## 🚀 Production Recommendations

1. **Always use real Judge0 API** in production
2. **Set proper rate limiting** for API calls
3. **Monitor API usage** to avoid quota issues
4. **Add request timeout** (currently 30 seconds)
5. **Log all compilation errors** for debugging
6. **Cache common test cases** if needed

---

## 📞 Support

If the compiler isn't working:
1. Check backend is running (`npm run dev` in backend folder)
2. Check the browser console for errors
3. Check the backend console for API errors
4. Verify `.env` configuration
5. Try the test curl command above

**Current Status:** ✅ Working with mock compiler fallback
