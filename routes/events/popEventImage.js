const Event = require('../../models/Event.js'); // Adjust the path here

const popEventImage = async (req, res, next) => {
    try {
        const { event_id } = req.body;
        console.log(req.body);
        // Find the event by ID
        const event = await Event.findById(event_id);
    
        if (!event) {
          return res.status(404).json({ error: 'Event not found' });
        }
    
        // Pop the last image from the event's image array
        const lastImage = event.images.pop();
    
        // Save the updated event without the popped image
        await event.save();
    
        res.status(200).json({ message: 'Last image popped successfully', poppedImage: lastImage });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = popEventImage