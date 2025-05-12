const Category = require('../models/Category');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');

// ----------- CATEGORIES ----------
exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// ----------- LESSONS ----------
exports.getLessonsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const lessons = await Lesson.find({ categoryId });
  res.json(lessons);
};

// ----------- QUIZZES ----------
exports.getQuizzesByLesson = async (req, res) => {
  const { lessonId } = req.params;
  const quizzes = await Quiz.find({ lessonId });
  res.json(quizzes);
};

// ----------- ADMIN (OPTIONAL) ----------
exports.addCategory = async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).json(category);
};

exports.addLesson = async (req, res) => {
  const lesson = new Lesson(req.body);
  await lesson.save();
  res.status(201).json(lesson);
};

exports.addQuiz = async (req, res) => {
  const quiz = new Quiz(req.body);
  await quiz.save();
  res.status(201).json(quiz);
};
