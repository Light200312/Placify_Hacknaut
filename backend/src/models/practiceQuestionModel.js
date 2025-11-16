import mongoose from 'mongoose';
const { Schema } = mongoose;

const practiceQuestionSchema = new Schema({
  company: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  round: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  questions: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      difficulty: { type: String, required: true },
      topicTags: [{ type: String }],
      acRate: { type: Number },
      url: { type: String, required: true },
      description: { type: String },
    }
  ],
  estimatedTime: {
    minutes: { type: Number },
    hours: { type: Number },
    formatted: { type: String },
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Create a compound index for fast lookups of company + round
practiceQuestionSchema.index({ company: 1, round: 1 }, { unique: true });

const PracticeQuestion = mongoose.model('PracticeQuestion', practiceQuestionSchema);
export default PracticeQuestion;