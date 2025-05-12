const express = require('express');
const router = express.Router();
const { register, login, profile, addXP, updateStreak, getLeaderboard } = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, profile);
router.post('/xp', auth, addXP);
router.post('/streak', auth, updateStreak);
router.get('/leaderboard', auth, getLeaderboard);

module.exports = router;
