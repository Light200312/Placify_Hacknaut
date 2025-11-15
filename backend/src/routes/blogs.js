import express from 'express';
import Blog from '../models/Blog.js';
import { blogPosts } from '../data/blogs.js';

const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Initialize sample blogs
router.post('/init-sample-data', async (req, res) => {
  try {
    await Blog.deleteMany({});
    await Blog.insertMany(blogPosts);

    res.status(201).json({
      message: 'Sample blog data initialized',
      count: blogPosts.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
