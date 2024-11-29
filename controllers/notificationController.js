require('dotenv').config();  // โหลดค่าจากไฟล์ .env

const axios = require('axios');

// ฟังก์ชันส่งข้อความไปยัง Line User ID
// ฟังก์ชันสำหรับการส่งข้อความการชำระเงิน
const sendPaymentCompletedNotification = async (userId) => {
  const message = "การชำระเงินของคุณสำเร็จแล้ว ขอบคุณที่เลือกใช้บริการ!";
  return await sendMessageToLineUser(userId, message);
};

// ฟังก์ชันที่ส่งข้อความไปยัง Line User ID
const sendMessageToLineUser = async (userId, message) => {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  const url = 'https://api.line.me/v2/bot/message/push';
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  };

  const body = {
    to: userId,
    messages: [
      {
        type: 'text',
        text: message
      }
    ]
  };

  try {
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ส่งออกฟังก์ชันทั้งหมด
module.exports = {
  sendPaymentCompletedNotification,
  sendMessageToLineUser,
};
