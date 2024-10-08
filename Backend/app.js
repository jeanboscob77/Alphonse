const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes'); // Import the routes
const serviceRoutes = require('./routes/serviceRoute')
const contactRoute = require('./routes/contactRoute')

const app = express();

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware to parse JSON data
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve the uploads folder statically

// Use the routes
app.use('/api/', blogRoutes);
app.use('/api/', serviceRoutes);
app.use('/api/',contactRoute)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
