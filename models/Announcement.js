const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#FFF9C4',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Announcement', AnnouncementSchema); 