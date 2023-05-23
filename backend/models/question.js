const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  content: String,
  options: [String],
  correctAnswer: Number,
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Question', questionSchema);