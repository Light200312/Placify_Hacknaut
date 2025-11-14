import mongoose from 'mongoose';

// --- Mongoose Schema & Model ---
const ProfileSchema = new mongoose.Schema({
  profileId: { type: String, required: true, unique: true },
  skills: { type: String, default: '' },
  projects: { type: String, default: '' },
  experience: { type: String, default: '' },
  gpa: { type: String, default: '0' },
  prepinstaScore: { type: String, default: '0' },
  indiaBixScore: { type: String, default: '0' },
});

const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;