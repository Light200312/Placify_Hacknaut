import mongoose from 'mongoose';
const { Schema } = mongoose;

const prepGuideSchema = new Schema({
  company: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true
  },
  jobRole: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true
  },
  guideData: {
    type: Schema.Types.Mixed, // Stores the entire JSON object from the AI
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Create a compound index to ensure company + jobRole pairs are unique and queries are fast
prepGuideSchema.index({ company: 1, jobRole: 1 }, { unique: true });

const PrepGuide = mongoose.model('PrepGuide', prepGuideSchema);
export default PrepGuide;