const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    title: String,
    content: String, // meaning, explanation
    audio: String,   // optional audio URL
    image: String    // optional image URL
});

module.exports = mongoose.model('Lesson', lessonSchema);
