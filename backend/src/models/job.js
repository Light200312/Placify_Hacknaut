import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  // We add an 'adzunaId' to prevent duplicate entries from the API
  adzunaId: { type: String, unique: true, sparse: true }, 
  title: String,
  companyName: String,
  locationString: String, // Adzuna provides this as 'location.display_name'
  source: String, // 'Govt - USAJOBS' or 'Private - Adzuna'
  jobType: String, // 'full_time', 'part_time', 'contract'
  description: String
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Create a text index for searching
jobSchema.index({ title: 'text', companyName: 'text', description: 'text' });

const Job = mongoose.model('Job', jobSchema);

export default Job;