import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  // We add an 'adzunaId' to prevent duplicate entries from the API
  adzunaId: { type: String, unique: true, sparse: true }, 
  title: String,
  companyName: String,
  locationString: String, // Adzuna provides this as 'location.display_name'
  source: String, // 'Govt - USAJOBS' or 'Private - Adzuna'
  jobType: String, // 'full_time', 'part_time', 'contract'
  description: String,
  // New fields for enhanced display
  category: String, // Job category (e.g., 'IT Jobs', 'Part time Jobs')
  redirectUrl: String, // Direct link to job listing
  salaryMin: Number, // Minimum salary
  salaryMax: Number, // Maximum salary
  latitude: Number, // Job location latitude
  longitude: Number, // Job location longitude
  createdDate: Date // Job created date from API
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Create a text index for searching
jobSchema.index({ title: 'text', companyName: 'text', description: 'text' });

const Job = mongoose.model('Job', jobSchema);

export default Job;