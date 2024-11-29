const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');  // นำเข้า UserController

router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);

// ใช้ฟังก์ชัน updateLineId จาก UserController
router.patch("/update/:userId", userController.updateLineId);
router.get('/get-user-id', userController.getUserIdFromSession);


module.exports = router;
