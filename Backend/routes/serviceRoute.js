const express = require('express');
const multer = require('multer');
const connection = require('./db'); // Import MySQL connection

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

// Route that retrieves all services from the database
router.get('/services', (req, res) => {
  const query = 'SELECT * FROM services';
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to retrieve services' });
    }
    res.json(results);
  });
});

// Route to retrieve a single service by ID
router.get('/services/:id', (req, res) => {
  const query = 'SELECT * FROM services WHERE id = ?';
  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to retrieve service' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(results[0]);
  });
});

// Route to handle service creation with image upload
router.post('/services', upload.single('selectedFile'), (req, res) => {
  const { title, description } = req.body;
  const selectedFile = req.file ? req.file.path : null; // Get the uploaded file path
  const moreInfo = req.body.moreInfo ? JSON.parse(req.body.moreInfo) : null; // Parse the moreInfo JSON string

  const query = 'INSERT INTO services (title, description, selectedFile, moreInfo) VALUES (?, ?, ?, ?)';
  connection.query(query, [title, description, selectedFile, JSON.stringify(moreInfo)], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to create service' });
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

// Route to update a service by ID
router.put('/services/:id', upload.single('selectedFile'), (req, res) => {
  const { title, description } = req.body;
  const selectedFile = req.file ? req.file.path : null; // Get the uploaded file path
  const moreInfo = req.body.moreInfo ? JSON.parse(req.body.moreInfo) : null; // Parse the moreInfo JSON string

  const query = 'UPDATE services SET title = ?, description = ?, selectedFile = ?, moreInfo = ? WHERE id = ?';
  connection.query(query, [title, description, selectedFile, JSON.stringify(moreInfo), req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to update service' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found' });
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

// Route to delete a service by ID
router.delete('/services/:id', (req, res) => {
  const query = 'DELETE FROM services WHERE id = ?';
  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to delete service' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  });
});

module.exports = router;  // Export the router
