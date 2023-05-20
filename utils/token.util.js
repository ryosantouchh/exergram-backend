const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const privateKey = process.env.JWT_PRIVATE_KEY;
  const options = { expiresIn: 60 * 60 * 8 }; // 8 hours
  const token = jwt.sign(payload, privateKey, options);
  return token;
};

module.exports = { generateToken };
