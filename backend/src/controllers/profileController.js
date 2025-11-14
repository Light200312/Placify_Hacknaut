import Profile from '../models/profileModel.js';
import dotenv from "dotenv"
dotenv.config();
/**
 * [POST] /api/profile
 * Saves or updates a student's profile.
 */
export const saveProfile = async (req, res) => {
  const { profileId, skills, projects, experience, gpa, prepinstaScore, indiaBixScore } = req.body;

  if (!profileId) {
    return res.status(400).json({ message: 'profileId is required' });
  }

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { profileId: profileId },
      { skills, projects, experience, gpa, prepinstaScore, indiaBixScore },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Error saving profile', error: error.message });
  }
};