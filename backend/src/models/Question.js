import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  question: String,
  options: [String],
  correctAnswer: String,
  explanation: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
  },
  category: String,
  company: String,
  round: {
    type: String,
    enum: ['aptitude', 'technical', 'communication'],
  },
});

export default mongoose.model('Question', questionSchema);
