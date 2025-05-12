const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String // optional thumbnail image URL
});

module.exports = mongoose.model('Category', categorySchema);
