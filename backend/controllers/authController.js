const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // generate token
  const token = generateToken(email);

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      name,
      email
    },
    hashedPassword,
    token
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    });
  }

  // generate token
  const token = generateToken(email);

  res.status(200).json({
    message: 'Login successful',
    token
  });
};

module.exports = {
  registerUser,
  loginUser
};