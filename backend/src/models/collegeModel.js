import mongoose from 'mongoose';

const companySubSchema = new mongoose.Schema({
  name: String,
  website: String,
  linkedin: String,
  positions: [String],
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
});

const College = mongoose.model('College', collegeSchema);

export default College;