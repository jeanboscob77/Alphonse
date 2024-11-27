const express = require('express');
const router = express.Router();
const connection = require('./db'); // Import MySQL connection

// Route to retrieve all contacts
router.get('/contacts', async (req, res) => {
    try {
        const query = 'SELECT * FROM contacts';
        connection.query(query, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to retrieve contacts' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve contacts' });
    }
});

// Route to create a new contact
router.post('/contacts', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
        connection.query(query, [name, email, message], (err, result) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to create contact' });
            }
            res.status(201).json({
                id: result.insertId,
                name,
                email,
                message
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create contact' });
    }
});

// Route to update a contact by ID
router.put('/contacts/:id', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contactId = req.params.id;

        const query = 'UPDATE contacts SET name = ?, email = ?, message = ? WHERE id = ?';
        connection.query(query, [name, email, message, contactId], (err, result) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to update contact' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Contact not found' });
            }

            res.json({ id: contactId, name, email, message });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update contact' });
    }
});

// Route to delete a contact by ID
router.delete('/contacts/:id', async (req, res) => {
    try {
        const contactId = req.params.id;

        const query = 'DELETE FROM contacts WHERE id = ?';
        connection.query(query, [contactId], (err, result) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to delete contact' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Contact not found' });
            }

            res.json({ message: 'Contact deleted successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete contact' });
    }
});

module.exports = router;
