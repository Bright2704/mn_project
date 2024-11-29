const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // ตรวจสอบว่า Authorization header มีค่าหรือไม่
  const token = req.header("Authorization");

  console.log('Authorization Header:', token); 

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided or invalid token format." });
  }

  // เอาค่า token ออกมา
  const tokenValue = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(tokenValue, "f2b12fd4235b8fd05326717dca6f3debd72b7edb8fa21458e5ec8f235f8a8292");  // ตรวจสอบโทเคน
    req.user = decoded;  
    next();  
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticate;
