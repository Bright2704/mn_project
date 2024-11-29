const express = require('express');
const router = express.Router();
const {
  sendOrderCreatedNotification,
  sendPaymentCompletedNotification
} = require('../controllers/notificationController');  // นำเข้าฟังก์ชันจาก notificationController


router.post('/send/order-created', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const response = await sendOrderCreatedNotification(userId);  // เรียกใช้ฟังก์ชันจาก controller
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
});

// POST endpoint สำหรับส่งข้อความการชำระเงิน
router.post('/send/payment-completed', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const response = await sendPaymentCompletedNotification(userId);  // เรียกใช้ฟังก์ชันจาก controller
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
});

module.exports = router;
