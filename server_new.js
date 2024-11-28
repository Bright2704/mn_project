const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5001;

// ตั้งค่า CORS ให้รองรับ React บน localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',  // URL ที่ React ใช้
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/MN_TEST', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route Imports
const orderRoutes = require('./routes/orderRoutes');
const itemRoutes = require('./routes/itemRoutes');
const depositRoutes = require('./routes/depositRoutes');
const lotRoutes = require('./routes/lotRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const bookBankRoutes = require('./routes/bookBankRoutes'); // Import new routes
const withdrawRoutes = require('./routes/withdrawRoutes');
const bookAddressRoutes = require('./routes/bookAddressRoutes');
const userRoutes = require('./routes/userRoutes');
const announcementRoutes = require('./routes/announcement');
const notificationRoutes = require('./routes/notificationRoutes');

// Static files for uploaded images, etc.
app.use('/storage', express.static(path.join(__dirname, 'public/storage')));

// Use Routes
app.use('/orders', orderRoutes);
app.use('/items', itemRoutes);
app.use('/deposits', depositRoutes);
app.use('/lots', lotRoutes);
app.use('/tracking', trackingRoutes);
app.use('/balances', balanceRoutes);
app.use('/book_bank', bookBankRoutes); // Use new routes
app.use('/withdraws', withdrawRoutes);
app.use('/book_address', bookAddressRoutes);
app.use('/users', userRoutes);
app.use('/api/announcement', announcementRoutes);
app.use('/api/notifications', notificationRoutes);




// Error Handling for Unhandled Routes
app.use((req, res) => res.status(404).send('Not Found'));

// Start Server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
