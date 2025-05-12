const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Add XP to User
// This controller handles adding XP to a user and updating their level.

exports.addXP = async (req, res) => {
  try {
    const { xp } = req.body;
    const user = await User.findById(req.user.id);
    user.xp += xp;
    await user.save();
    res.json({ message: 'XP added', totalXP: user.xp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// update streak
exports.updateStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const today = new Date().toDateString();
    const last = user.lastActive ? new Date(user.lastActive).toDateString() : null;
    
    if (last === today) {
      return res.json({ message: 'Streak already updated today',streak: user.streak });
    }
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (last === yesterday.toDateString()) {
      user.streak += 1;
    } else {
      user.streak = 1;
    }
    user.lastActive = new Date();
    await user.save();
    res.json({ message: 'Streak updated', streak: user.streak });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Leaderboard
// This controller retrieves the leaderboard data, sorted by XP.

exports.getLeaderboard = async (req, res) => {
  try{
    const topUsers = await User.find().sort({ xp: -1 }).limit(10).select('name xp level streak badges');
    res.json(topUsers);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
}; 

// User Registration
// This controller handles user registration, login, and profile retrieval.
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: 'Email already in use or invalid input.' });
  }
};
// User Login
// This controller handles user registration, login, and profile retrieval.
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, role: user.role, xp: user.xp } });
};

exports.profile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};
