import mongoose from 'mongoose';
const { Schema } = mongoose;

const parsedResumeSchema = new Schema({
  resumeHash: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  parsedData: {
    type: Schema.Types.Mixed, // Stores the entire JSON object from the AI
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

const ParsedResume = mongoose.model('ParsedResume', parsedResumeSchema);
export default ParsedResume;