import mongoose from 'mongoose';

const companySubSchema = new mongoose.Schema({
  name: String,
  website: String,
  linkedin: String,
  positions: [String],
});

const questionSchema = new mongoose.Schema({
  qId: { type: String, required: true },
  questionText: { type: String, required: true },
  options: [String],
  correctAnswer: { type: String, required: true },
  explanation: { type: String },
  type: { type: String, required: true, enum: ['aptitude', 'technical', 'communication', 'logical', 'verbal', 'quantitative'] }
});

const roundSchema = new mongoose.Schema({
  roundName: { type: String, required: true }, // e.g., "Aptitude Test"
  roundType: { type: String, required: true, enum: ['aptitude', 'technical', 'communication'] }, // For broad routing
  questions: [questionSchema]
});
const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  companies: [companySubSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  placementData: [roundSchema]
});

const College = mongoose.model('College', collegeSchema);

export default College;


