const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact')


// Route to retrieve a single service by ID
router.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();
      if (!contacts) {
        return res.status(404).json({ error: 'contact not found' });
      }
      res.json(contacts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to retrieve contact' });
    }
  });
  

// Route to update a service by IDtry {
    router.post('/contacts', async (req, res) => {
        try {
          const { name, email,message } = req.body;
      
          // Create a new service document
          const contact = new Contact({
            name,
            email,
            message,
          });
      
          // Save the service in the database
          await contact.save();
          res.status(201).json(contact);
        } catch (error) {
          res.status(500).json({ error: 'Failed to create service' });
        }
      });
// Route to handle contact retrieve by ID

router.put('/contacts/:id', async (req, res) => {
    try {
      const { name, email, message } = req.body;
     
  
      const updatedcontact = await Contact.findByIdAndUpdate(
        req.params.id,
        { name, email, message },
        { new: true } // Return the updated document
      );
  
      if (!updatedcontact) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(updatedcontact);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to update blog' });
    }
  });



// Route to update a service by ID
router.put('/contacts/:id', async (req, res) => {
    try {
      const { name, email, message } = req.body;
     
  
      const updatedcontact = await Contact.findByIdAndUpdate(
        req.params.id,
        { name, email, message },
        { new: true } // Return the updated document
      );
  
      if (!updatedcontact) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(updatedcontact);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to update blog' });
    }
  });
  
  // Route to delete a service by ID
  router.delete('/contacts/:id', async (req, res) => {
    try {
      const deletedContact = await Contact.findByIdAndDelete(req.params.id);
      if (!deletedContact) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to delete blog' });
    }
  });



  module.exports = router; 