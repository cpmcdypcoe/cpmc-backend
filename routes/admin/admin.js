const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/Admin.js'); // Adjust the paths here
const Student = require('../../models/Student.js'); // Adjust the paths here
const Contact = require('../../models/Contact.js'); // Adjust the paths here
const connectDB = require('../../config/mongoDB.js'); // Adjust the paths here

// Middleware for verifying tokens
const verifyToken = (req, res, next) => {
    const token = req.headers['x-auth-token'];

    if (!token) {
        return res.status(401).json({ msg: 'No Authorization Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(500).json({ msg: 'Token is invalid' });
    }
};

// POST /api/admin/register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (admin) {
            return res.json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const newAdmin = new Admin({ email, password: hashedPassword });

        await newAdmin.save();

        return res.json({ admin: newAdmin });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/admin/data
router.get('/data', verifyToken, async (req, res) => {
    try {
        const students = await Student.find({});
        const contacts = await Contact.find({});
        // const event1 = await Event1.find({});

        res.status(200).json({ message: 'Success', students, contacts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
