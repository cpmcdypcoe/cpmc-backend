const express = require('express');
const router = express.Router();
const Contact = require('../../models/Contact.js'); // Adjust the paths here
const connectDB = require('../../config/mongoDB.js'); // Adjust the paths here

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).json({ message: 'Invalid request' });
    }

    await connectDB(); // Assuming this function establishes a MongoDB connection

    try {
        const { name, email, message } = req.body;

        if (!validateEmail(email) || !name || !message) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.status(200).json({ message: 'Message sent successfully', contact: newContact });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = handler;
