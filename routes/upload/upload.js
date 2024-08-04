const sharp = require('sharp')
const Event = require('../../models/Event.js'); // Adjust the path here

const UploadImage = async (req, res, next) => {
    try {
        const file = req.file
        const { event_id } = req.body;
        console.log(file)
        const buf = await sharp(file.buffer)
            .resize({ height: 1080, width: 1080, fit: "contain" })
            .toBuffer()
        const base64String = buf.toString('base64');
        const base64Image = `data:image/jpeg;base64,${base64String.toString('base64')}`

        const event = await Event.findById(event_id);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        event.images.push(base64Image);

        await event.save();
        res.send({ 'img': base64Image });
    } catch (err) {
        console.log(err)
        res.status(400).send({
            'code': 400,
            'msg': 'Failed to upload object to S3'
        })
        return;
    }
}

module.exports = UploadImage