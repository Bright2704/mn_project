// controllers/UserController.js
const User = require('../models/User');
const { getSession } = require("next-auth/react");



exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ user_id: userId }, { password: 0 }); // Exclude password
    
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
    // ดึง session เพื่อหา user_id
    const session = await getSession({ req });
    
    if (!session || !session.user || !session.user.user_id) {
      return res.status(400).json({ message: 'User not authenticated or user_id missing' });
    }

    const { lineId } = req.body;
    const userId = session.user.user_id;  // ใช้ user_id จาก session

    console.log('Received lineId:', lineId);
    console.log('Searching for user with user_id:', userId);

    // ค้นหาผู้ใช้ตาม user_id
    const user = await User.findOne({ user_id: userId });

    if (!user) {
      console.log('User not found for user_id:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // อัปเดต line_id
    user.line_id = lineId;
    await user.save();

    console.log('Line ID updated successfully:', user);
    res.status(200).json({ message: 'Line ID updated successfully', user });
  } catch (error) {
    console.error('Error updating line ID:', error);
    res.status(500).json({ message: 'Failed to update Line ID' });
  }
};