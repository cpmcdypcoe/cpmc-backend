
const Event = require('../../models/Event.js'); // Adjust the paths here

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const {
                event_name,
                caption,
                description,
                event_date,
                event_time,
                venue,
                is_completed,
                is_competition_form
            } = req.body;

            // Create a new Event document
            const newEvent = new Event({
                event_name,
                caption,
                description,
                event_date,
                event_time,
                venue,
                is_completed,
                is_competition_form
            });

            await newEvent.save();

            res.status(200).json({ message: 'Event created successfully', event: newEvent });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    if (req.method === 'GET') {
        try {
            const events = await Event.find({}).select('-images');
            res.status(200).json({ events });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = handler;
