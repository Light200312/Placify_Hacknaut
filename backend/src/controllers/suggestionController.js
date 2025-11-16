import fetch from 'node-fetch';
import Suggestion from '../models/suggestionModel.js';
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY2 || process.env.GEMINI_API_KEY;

const systemPrompt = `
You are a helpful mentor for engineering students. Your task is to suggest useful resources based on their Year, Branch, and Skills.
You must provide two types of suggestions:
1. **AI Prompts:** Specific, high-quality prompts students can paste into ChatGPT/Claude to get work done (e.g., for project ideas, debugging, resume review).
2. **Websites/Tools:** Helpful online tools for students (e.g., for diagrams, free books, research papers, coding practice).

Input Format: Year: {year}, Branch: {branch}, Skills: {skills}.

Output MUST be a valid JSON object with this structure:
{
  "prompts": [
    {
      "title": "Short title",
      "aim": "What this prompt achieves",
      "targetedAI": "Best AI for this (e.g. ChatGPT, Midjourney)",
      "promptText": "The actual prompt text...",
      "benefits": "Why this helps"
    }
  ],
  "websites": [
    {
      "name": "Website Name",
      "category": "e.g. Debugging, Design, Research",
      "purpose": "What it does",
      "benefits": "Key features",
      "url": "Valid URL"
    }
  ]
}
Provide at least 5 Prompts and 5 Websites.
`;

export const generateSuggestions = async (req, res) => {
  const { year, branch, skills } = req.body;

  if (!year || !branch) {
    return res.status(400).json({ message: "Year and Branch are required." });
  }

  if (!GEMINI_API_KEY) {
    console.error("Gemini API Key is missing. Check .env file for GEMINI_API_KEY2 or GEMINI_API_KEY.");
    return res.status(500).json({ message: "AI server configuration error." });
  }

  try {
    // 1. Check Cache
    const cached = await Suggestion.findOne({
      'userProfile.year': year,
      'userProfile.branch': branch,
      'userProfile.skills': skills
    });

    if (cached) {
      console.log("✅ Suggestions: Cache Hit");
      return res.json({ success: true, data: cached.generatedData, source: 'cache' });
    }

    // 2. Call Gemini AI
    console.log("⚠️ Suggestions: Cache Miss. Calling Gemini...");
    const userQuery = `Student Profile: Year: ${year}, Branch: ${branch}, Skills: ${skills || 'General'}. Suggest helpful tools and prompts.`;
    
    // --- **** START: THIS IS THE FIX **** ---
    // Changed model from 'gemini-1.5-flash' to 'gemini-2.5-flash-preview-09-2025'
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;
    // --- **** END: THIS IS THE FIX **** ---
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const result = await response.json();
    
    // Improved Error Handling
    if (result.error) {
      console.error('Gemini API Error:', result.error.message);
      throw new Error(`AI API Error: ${result.error.message}`);
    }
    if (!result.candidates || result.candidates.length === 0) {
      if (result.promptFeedback && result.promptFeedback.blockReason) {
        console.error('AI Request Blocked:', result.promptFeedback.blockReason);
        throw new Error(`AI request blocked: ${result.promptFeedback.blockReason}`);
      }
      throw new Error("AI response invalid: No candidates returned.");
    }
    if (!result.candidates[0].content || !result.candidates[0].content.parts || !result.candidates[0].content.parts[0].text) {
       console.error('AI Response Invalid Structure:', result.candidates[0]);
       if (result.candidates[0].finishReason === "SAFETY") {
         throw new Error("AI response blocked for safety reasons.");
       }
       throw new Error("AI response invalid: Candidate content is missing or empty.");
    }
    // End Improved Error Handling

    const aiJson = JSON.parse(result.candidates[0].content.parts[0].text);

    // 3. Save to DB
    const newSuggestion = new Suggestion({
      userProfile: { year, branch, skills },
      generatedData: aiJson
    });
    await newSuggestion.save();

    res.json({ success: true, data: aiJson, source: 'ai' });

  } catch (error) {
    console.error("Suggestion Error:", error.message);
    res.status(500).json({ 
      message: "Failed to generate suggestions.",
      error: error.message 
    });
  }
};