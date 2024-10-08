const express = require('express');
const multer = require('multer');
const Blog = require('../Models/Blog'); // Import your Blog model

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Add a timestamp to the file name
  }
});

const upload = multer({ storage });

// Route that retrieves all blogs from the database
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve blogs' });
  }
});

// Route to retrieve a single blog by ID
router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve blog' });
  }
});

// Route to handle blog creation with image upload
router.post('/blogs', upload.single('selectedFile'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const selectedFile = req.file ? req.file.path : null; // Get the uploaded file path

    // Create a new blog document
    const blog = new Blog({
      title,
      description,
      selectedFile,
    });

    // Save the blog in the database
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

// Route to update a blog by ID
router.put('/blogs/:id', upload.single('selectedFile'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const selectedFile = req.file ? req.file.path : null; // Get the uploaded file path

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description, selectedFile },
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(updatedBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

// Route to delete a blog by ID
router.delete('/blogs/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

module.exports = router; // Export the router
