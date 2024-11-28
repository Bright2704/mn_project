const Notification = require('../models/notification');

// Create a new notification
exports.createNotification = async (req, res) => {
  const { userId, title, message } = req.body;

  try {
    const newNotification = new Notification({
      userId,
      title,
      message,
    });

    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Failed to create notification' });
  }
};

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId }).sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Failed to update notification' });
  }
};

// Handle LINE Login Callback and save user profile
exports.lineLoginCallback = async (req, res) => {
  const { code } = req.query;  // รับ `code` จาก LINE ที่ส่งมาใน callback

  if (!code) {
      return res.status(400).json({ error: 'Missing code from LINE login' });
  }

  try {
      // Exchange `code` for access token
      const response = await axios.post('https://api.line.me/oauth2/v2.1/token', {
          grant_type: 'authorization_code',
          code,
          redirect_uri: 'https://localhost:5001/api/line-login/callback',  // URL ของ callback
          client_id: '2006545984',
          client_secret: '0948bd612de5777b3ae50878ef9ddb47',
      });

      const { access_token } = response.data;

      // ใช้ access_token เพื่อดึงข้อมูลโปรไฟล์จาก LINE
      const profileResponse = await axios.get('https://api.line.me/v2/profile', {
          headers: {
              Authorization: `Bearer ${access_token}`,
          },
      });

      const profile = profileResponse.data;

      // อัพเดตข้อมูลหรือสร้างผู้ใช้ใหม่ในฐานข้อมูล
      let user = await User.findOne({ user_id: profile.userId });

      if (!user) {
          // ถ้าไม่มีผู้ใช้นี้ในฐานข้อมูล ให้สร้างผู้ใช้ใหม่
          user = new User({
              name: profile.displayName,
              email: profile.email || 'N/A',
              user_id: profile.userId,
              line_id: profile.userId,
              phone: 'N/A',  // สามารถตั้งค่าให้เป็น N/A หรือข้อมูลที่คุณต้องการ
              password: '',  // สามารถใช้รหัสผ่านที่ตั้งไว้หรือทำให้เป็น null
              role: 'user',
              user_type: 'normal',
          });
          await user.save();
      }

      // ส่งข้อมูลโปรไฟล์กลับไป
      res.status(200).json({
          message: 'User logged in successfully',
          profile,
      });

  } catch (error) {
      console.error('Error during LINE login callback', error);
      res.status(500).json({ error: 'Failed to process LINE login callback' });
  }
};