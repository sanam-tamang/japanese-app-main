const mongoose = require('mongoose');

const documentProgressSchema = new mongoose.Schema({
  title: String,
  isSubmitted: { type: Boolean, default: false },
  submittedAt: Date,
  remarks: String
});

const applicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute' },
  universityName: String,
  course: String,
  status: {
    type: String,
    enum: ['applied', 'reviewing', 'processing', 'completed'],
    default: 'applied'
  },
  documentProgress: [documentProgressSchema]
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
