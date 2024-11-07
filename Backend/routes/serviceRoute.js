const express = require('express');
const multer = require('multer');
const Service = require('../Models/Service'); // Import your Service model

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

// Route that retrieves data from the database
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve services' });
  }
});


// Route to retrieve a single service by ID
router.get('/services/:id', async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to retrieve service' });
    }
  });
  router.post('/services', upload.single('selectedFile'), async (req, res) => {
    console.log('Received body:', req.body);  // Log incoming data
    console.log('Received file:', req.file);  // Log uploaded file
  
    const { title, description } = req.body;
    const selectedFile = req.file ? req.file.path : null; // Get the uploaded file path
    
    // Directly use the subServices from req.body
    const subServices = JSON.parse(req.body.subServices); // Parse the subServices JSON string
  
    const newService = new Service({
      title,
      description,
      selectedFile,
      subServices
    });
  
    try {
      const savedService = await newService.save();
      res.status(201).json(savedService);
    } catch (err) {
      console.error('Error:', err);
      res.status(400).json({ message: err.message });
    }
  });
  


// Route to update a service by ID
router.put('/services/:id', upload.single('selectedFile'), async (req, res) => {
    try {
      const { title, description } = req.body;
      const selectedFile = req.file ? req.file.path : null; // Get the uploaded file path
      const subServices = JSON.parse(req.body.subServices); // Parse the subServices JSON string
      const updatedService = await Service.findByIdAndUpdate(
        req.params.id,
        { title, description, selectedFile,subServices },
        { new: true } // Return the updated document
      );
  
      if (!updatedService) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(updatedService);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to update blog' });
    }
  });
  
  // Route to delete a service by ID
  router.delete('/services/:id', async (req, res) => {
    try {
      const deletedService = await Service.findByIdAndDelete(req.params.id);
      if (!deletedService) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to delete blog' });
    }
  });

module.exports = router; // Export the router
