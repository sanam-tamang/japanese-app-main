const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  type: { type: String, enum: ['nepal', 'japan'], required: true },
  logo: String
});

module.exports = mongoose.model('Institute', instituteSchema);
