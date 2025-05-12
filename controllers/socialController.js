const Message = require('../models/Message');
const Post = require('../models/Post');

// MESSAGES
exports.sendMessage = async (req, res) => {
  const { receiverId, content, attachments } = req.body;
  const message = await Message.create({
    senderId: req.user.id,
    receiverId,
    content,
    attachments
  });
  res.status(201).json(message);
};

exports.getMessagesWithUser = async (req, res) => {
  const { userId } = req.params;
  const messages = await Message.find({
    $or: [
      { senderId: req.user.id, receiverId: userId },
      { senderId: userId, receiverId: req.user.id }
    ]
  }).sort({ createdAt: 1 });
  res.json(messages);
};

// POSTS
exports.createPost = async (req, res) => {
  const { content, media } = req.body;
  const post = await Post.create({ userId: req.user.id, content, media });
  res.status(201).json(post);
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'name');
  res.json(posts);
};

exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post.likes.includes(req.user.id)) post.likes.push(req.user.id);
  await post.save();
  res.json({ likes: post.likes.length });
};

exports.commentPost = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  const post = await Post.findById(postId);
  post.comments.push({ userId: req.user.id, text });
  await post.save();
  res.json({ comments: post.comments });
};
