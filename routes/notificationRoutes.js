const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Create a new notification
router.post('/create', notificationController.createNotification);

// Get notifications for a specific user
router.get('/:userId', notificationController.getUserNotifications);

// Mark a notification as read
router.put('/read/:id', notificationController.markAsRead);
router.get('/line-login/callback', notificationController.lineLoginCallback);

module.exports = router;
