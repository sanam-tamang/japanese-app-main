const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');

// 🧩 Add XP to user
router.post('/add-xp', auth, async (req, res) => {
  const { xp } = req.body;
  const user = await User.findById(req.user.id);
  user.xp += xp;
  await user.save();
  res.json({ message: `Added ${xp} XP`, currentXP: user.xp });
});

// 🔁 Update streak
router.post('/update-streak', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const today = new Date().setHours(0, 0, 0, 0);
  const last = user.lastActive ? new Date(user.lastActive).setHours(0, 0, 0, 0) : null;

  if (last === today) {
    return res.json({ message: "Already logged in today", streak: user.streak });
  }

  if (last === today - 86400000) { // 1 day in ms
    user.streak += 1;
  } else {
    user.streak = 1;
  }

  user.lastActive = new Date();
  await user.save();

  res.json({ message: "Streak updated", streak: user.streak });
});

module.exports = router;
