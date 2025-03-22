const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({ email, password: hashedPassword });

    
    const token = generateToken(newUser._id);

    
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
      token,
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    
    const accesstoken = generateToken(user._id);

    
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
      accesstoken,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};