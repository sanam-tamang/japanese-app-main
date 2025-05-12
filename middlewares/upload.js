const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

// Filter for images and audio
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|mp3|wav|m4a/;
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, allowed.test(ext));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
