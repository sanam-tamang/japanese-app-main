const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak : {type:Number, default:0},
  lastActive : {type:Date, default:null},
  badges:[{type:String}]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
