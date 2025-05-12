const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  sendMessage, getMessagesWithUser,
  createPost, getAllPosts, likePost, commentPost
} = require('../controllers/socialController');

// Messaging
router.post('/message', auth, sendMessage);
router.get('/messages/:userId', auth, getMessagesWithUser);

// Posts
router.post('/posts', auth, createPost);
router.get('/posts', auth, getAllPosts);
router.post('/posts/:postId/like', auth, likePost);
router.post('/posts/:postId/comment', auth, commentPost);

module.exports = router;
