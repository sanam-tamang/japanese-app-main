const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

router.post('/file', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ fileUrl: url });
});

module.exports = router;
