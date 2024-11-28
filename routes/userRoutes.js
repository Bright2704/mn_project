// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// เพิ่มเส้นทางสำหรับ POST /update-line-id
router.post('/update-line-id', UserController.updateLineId);  // ให้ใช้ POST ที่นี่

// เส้นทางอื่นๆ
router.get('/:userId', UserController.getUserById);
router.put('/:userId', UserController.updateUser);

module.exports = router;

