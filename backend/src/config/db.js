import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config();
// Retrieve MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/placementDb?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;