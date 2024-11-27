const express = require('express');
const multer = require('multer');
const connection = require('./db');  // Import MySQL connection

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
router.get('/blogs', (req, res) => {
  const query = 'SELECT * FROM blogs';
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to retrieve blogs' });
    }
    res.json(results);
  });
});

// Route to retrieve a single blog by ID
router.get('/blogs/:id', (req, res) => {
  const query = 'SELECT * FROM blogs WHERE id = ?';
  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to retrieve blog' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(results[0]);
  });
});

// Route to handle blog creation with image upload
router.post('/blogs', upload.single('selectedFile'), (req, res) => {
  const { title, description } = req.body;
  const selectedFile = req.file ? req.file.path : null; // Get the uploaded file path
  const moreInfo = req.body.moreInfo ? JSON.parse(req.body.moreInfo) : null; // Parse the moreInfo JSON string

  const query = 'INSERT INTO blogs (title, description, selectedFile, moreInfo) VALUES (?, ?, ?, ?)';
  connection.query(query, [title, description, selectedFile, JSON.stringify(moreInfo)], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to create blog' });
    }
    res.status(201).json({
      id: results.insertId,
      title,
      description,
      selectedFile,
      moreInfo
    });
  });
});

// Route to update a blog by ID
router.put('/blogs/:id', upload.single('selectedFile'), (req, res) => {
  const { title, description } = req.body;
  const selectedFile = req.file ? req.file.path : null; // Get the uploaded file path
  const moreInfo = req.body.moreInfo ? JSON.parse(req.body.moreInfo) : null; // Parse the moreInfo JSON string

  const query = 'UPDATE blogs SET title = ?, description = ?, selectedFile = ?, moreInfo = ? WHERE id = ?';
  connection.query(query, [title, description, selectedFile, JSON.stringify(moreInfo), req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to update blog' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({
      id: req.params.id,
      title,
      description,
      selectedFile,
      moreInfo
    });
  });
});

// Route to delete a blog by ID
router.delete('/blogs/:id', (req, res) => {
  const query = 'DELETE FROM blogs WHERE id = ?';
  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to delete blog' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  });
});

module.exports = router;  // Export the router
