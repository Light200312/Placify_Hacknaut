import express from 'express';
import Question from '../models/Question.js';
import { aptitudeQuestions, technicalQuestions, readingQuestions } from '../data/questions.js';

const router = express.Router();

// Get all questions
router.get('/', async (req, res) => {
  try {
    const { company, round } = req.query;

    let filter = {};
    if (company) filter.company = company;
    if (round) filter.round = round;

    const questions = await Question.find(filter);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get questions by company and round
router.get('/:company/:round', async (req, res) => {
  try {
    const { company, round } = req.params;
    const questions = await Question.find({ company, round });

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found' });
    }

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Initialize sample data (for testing)
router.post('/init-sample-data', async (req, res) => {
  try {
    await Question.deleteMany({});

    const allQuestions = [
      ...aptitudeQuestions,
      ...technicalQuestions,
      ...readingQuestions,
    ];

    await Question.insertMany(allQuestions);

    res.status(201).json({
      message: 'Sample data initialized successfully',
      count: allQuestions.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
