// api/mainRoutes.js
const express = require('express');
const router = express.Router();

// Require and use the sub-routes
const adminRoutes = require('./admin/admin');
const authorizeAdmin = require('./admin/authorizeAdmin');
const contactRoutes = require('./contact/contact');
const eventRoutes = require('./events/event');
const registrationRoutes = require('./events/registrations');
const eventDetailsRoutes = require('./events/eventDetails');
const registerRoutes = require('./register/register');
const UploadImage = require('./upload/upload');
const popEventImage = require('./events/popEventImage');

const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

// Use the sub-routes
router.use('/admin/authorizeAdmin', authorizeAdmin);
router.use('/admin', adminRoutes);
router.use('/contact', contactRoutes);
router.use('/events/registration', registrationRoutes);
router.use('/events/eventDetails', eventDetailsRoutes);
router.use('/events', eventRoutes);
router.use('/register', registerRoutes);
router.use('/upload/image', upload.single('image'), UploadImage);
router.use('/pop/image', popEventImage)

module.exports = router;
