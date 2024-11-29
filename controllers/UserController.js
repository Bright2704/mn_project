const { getSession } = require("next-auth/react");
const User = require('../models/User');
const { getToken } = require('next-auth/jwt');

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ user_id: userId }, { password: 0 });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phone, line_id, facebook } = req.body;

    // Check for duplicate email
    const existingUserWithEmail = await User.findOne({ 
      email, 
      user_id: { $ne: userId } 
    });
    if (existingUserWithEmail) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Check for duplicate phone
    const existingUserWithPhone = await User.findOne({ 
      phone, 
      user_id: { $ne: userId } 
    });
    if (existingUserWithPhone) {
      return res.status(400).json({ error: 'Phone number already in use' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { user_id: userId },
      { 
        name,
        email,
        phone,
        line_id,
        facebook
      },
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateLineId = async (req, res) => {
  try {
    const userId = req.params.userId; // ดึง userId จาก path parameter
    const { line_id } = req.body;  // ดึง line_id จาก body

    console.log('User ID:', userId);  // ตรวจสอบว่า userId ถูกต้อง
    console.log('Line ID:', line_id);  // ตรวจสอบว่า lineId ถูกต้อง

    // ค้นหาผู้ใช้โดยใช้ user_id จาก params และอัปเดต line_id
    const updatedUser = await User.findOneAndUpdate(
      { user_id: userId },  // ใช้ user_id จาก params
      { $set: { line_id: line_id } },  // อัปเดต line_id
      { new: true }  // คืนค่าผู้ใช้ที่อัปเดตแล้ว
    );

    // ถ้าไม่พบผู้ใช้
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);  // ส่งผลลัพธ์ที่อัปเดตแล้ว
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating line ID" });
  }
};



// controllers/UserController.js
// controllers/UserController.js
exports.getUserIdFromSession = async (req, res) => {
  try {
    const { getToken } = require('next-auth/jwt');  // นำเข้า getToken จาก next-auth/jwt
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });  // ถ้าไม่มี token จะส่งสถานะ 401 (Unauthorized)
    }

    // ถ้ามี token ให้ส่งข้อมูล user_id
    res.status(200).json({ user_id: token.user_id });  // ส่ง user_id ที่อยู่ใน token
  } catch (error) {
    console.error('Error fetching user ID from token:', error);
    res.status(500).json({ message: "Internal server error" });  // ถ้ามีข้อผิดพลาดในการดึงข้อมูลจะส่งสถานะ 500 (Internal Server Error)
  }
};

