const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('./db'); // Import MySQL connection
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register User
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validation: Ensure email and password are provided
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please provide email and password' });
        }

        // Check if the email already exists in the database
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], async (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Server error');
            }

            if (results.length > 0) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            // Create and hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Insert the new user into the database
            const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
            connection.query(insertQuery, [email, hashedPassword], (err, result) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Server error');
                }

                // Create a JWT token
                const token = jwt.sign({ id: result.insertId }, JWT_SECRET, { expiresIn: '1h' });

                // Respond with the token
                res.status(201).json({ token });
            });
        });
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

        // Check if the user exists in the database
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], async (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Server error');
            }

            if (results.length === 0) {
                return res.status(400).json({ msg: 'Invalid email or password' });
            }

            // Compare the entered password with the stored hashed password
            const isMatch = await bcrypt.compare(password, results[0].password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid email or password' });
            }

            // Create a JWT token
            const token = jwt.sign({ id: results[0].id }, JWT_SECRET, { expiresIn: '1h' });

            // Respond with the token
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
