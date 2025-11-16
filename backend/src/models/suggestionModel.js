import mongoose from 'mongoose';

const suggestionSchema = new mongoose.Schema({
  userProfile: {
    year: { type: String, required: true }, // e.g., "3rd Year"
    branch: { type: String, required: true }, // e.g., "Computer Science"
    skills: { type: String }, // e.g., "React, Node.js"
  },
  generatedData: {
    prompts: [
      {
        title: String,
        aim: String,
        targetedAI: String, // e.g., "ChatGPT / Claude"
        promptText: String,
        benefits: String
      }
    ],
    websites: [
      {
        name: String,
        category: String, // e.g., "Debugging", "Design"
        purpose: String,
        benefits: String,
        url: String
      }
    ]
  }
}, { timestamps: true });

// Index for fast lookup
suggestionSchema.index({ 'userProfile.year': 1, 'userProfile.branch': 1, 'userProfile.skills': 1 });

const Suggestion = mongoose.model('Suggestion', suggestionSchema);
export default Suggestion;