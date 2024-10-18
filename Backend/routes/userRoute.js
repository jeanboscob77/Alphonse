const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Register User
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validation: Ensure email and password are provided
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please provide email and password' });
        }

        // Check if the email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user instance
        user = new User({
            email,
            password
        });

        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user in the database
        await user.save();

        // Create and assign a JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token
        res.status(201).json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validation: Ensure email and password are provided
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please provide email and password' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Create and assign a JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
