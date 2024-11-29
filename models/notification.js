const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Link to the user
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },  // If the notification has been read
  timestamp: { type: Date, default: Date.now },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
