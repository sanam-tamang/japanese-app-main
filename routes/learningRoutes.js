const express = require('express');
const router = express.Router();
const {
  getCategories,
  getLessonsByCategory,
  getQuizzesByLesson,
  addCategory,
  addLesson,
  addQuiz
} = require('../controllers/learningController');

// Public APIs
router.get('/categories', getCategories);
router.get('/lessons/:categoryId', getLessonsByCategory);
router.get('/quizzes/:lessonId', getQuizzesByLesson);

// Admin APIs (could protect these later)
router.post('/categories', addCategory);
router.post('/lessons', addLesson);
router.post('/quizzes', addQuiz);

module.exports = router;
// This file defines the routes for the learning module of the application.
// It includes routes for fetching categories, lessons, and quizzes, as well as adding new categories, lessons, and quizzes.