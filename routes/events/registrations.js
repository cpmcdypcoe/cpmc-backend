const express = require('express');
const router = express.Router();
const connectDB = require('../../config/mongoDB.js'); // Adjust the path here
const Event = require('../../models/Event.js'); // Adjust the path here
const Student = require('../../models/Student.js'); // Adjust the path here

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await connectDB(); // Assuming this function establishes a MongoDB connection
    try {
      const { event_id } = req.body;
      const students = await Student.find({ events: event_id });

      res.status(200).json({ students });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = handler;
