const express = require('express');
const router = express.Router();
const connectDB = require('../../config/mongoDB.js'); // Adjust the path here
const Event = require('../../models/Event.js'); // Adjust the path here

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await connectDB(); // Assuming this function establishes a MongoDB connection
    try {
      const { event_id } = req.body;
      const event_details = await Event.find({ _id: event_id });
      res.status(200).json({ event_details });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'PUT') {
    await connectDB(); // Assuming this function establishes a MongoDB connection
    try {
      const { event_id, ...updatedEventData } = req.body;
      const updatedEvent = await Event.findByIdAndUpdate(event_id, updatedEventData, { new: true });
      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }

      res.status(200).json({ message: 'Event data updated successfully', updatedEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = handler;
