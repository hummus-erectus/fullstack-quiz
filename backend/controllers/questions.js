const questionsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const Quiz = require('../models/quiz');
const User = require('../models/user');
const Question = require('../models/question');

questionsRouter.post('/:quizId', async (request, response) => {
  const quizId = request.params.quizId;
  const { content, options, correctAnswer } = request.body;

  const token = request.token;
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token invalid' });
  }

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return response.status(404).json({ error: 'Quiz not found' });
  }

  if (quiz.user.toString() !== decodedToken.id) {
    return response.status(403).json({ error: 'Not authorized to add questions to this quiz' });
  }

  const question = new Question({
    content: content,
    options: options,
    correctAnswer: correctAnswer,
    quizzes: [quiz._id], // Associate the question with the current quiz
    user: decodedToken.id // Set the user field to the ID of the logged-in user
  });

  const savedQuestion = await question.save();

  quiz.questions.push(savedQuestion._id); // Add the question reference to the quiz's questions array
  await quiz.save();

  response.status(201).json(savedQuestion);
});


questionsRouter.get('/:quizId', async (request, response) => {
  const quizId = request.params.quizId;

  const quiz = await Quiz.findById(quizId).populate('questions');
  if (!quiz) {
    return response.status(404).json({ error: 'Quiz not found' });
  }

  const questions = quiz.questions;
  response.json(questions);
});

questionsRouter.get('/question/:questionId', async (request, response) => {
  const questionId = request.params.questionId;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return response.status(404).json({ error: 'Question not found' });
    }

    response.json(question);
  } catch (error) {
    response.status(400).json({ error: 'Invalid question ID' });
  }
});

questionsRouter.put('/question/:questionId', async (request, response) => {
  const questionId = request.params.questionId;
  console.log('Received question ID:', questionId);

  const token = request.token;
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token invalid' });
  }

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return response.status(404).json({ error: 'Question not found' });
    }

    // Ensure that the authenticated user is authorized to edit the question
    if (question.user.toString() !== decodedToken.id) {
      return response.status(403).json({ error: 'Not authorized to edit this question' });
    }

    // Update the question content, options, and correct answer based on the request body
    question.content = request.body.content;
    question.options = request.body.options;
    question.correctAnswer = request.body.correctAnswer;

    // Save the updated question
    const updatedQuestion = await question.save();

    response.json(updatedQuestion);
  } catch (error) {
    response.status(400).json({ error: 'Invalid question ID' });
  }
});


questionsRouter.delete('/question/:questionId', async (request, response) => {
  const questionId = request.params.questionId;
  console.log('Received question ID:', questionId);

  const token = request.token;
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token invalid' });
  }

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return response.status(404).json({ error: 'Question not found' });
    }

    // Ensure that the authenticated user is authorized to delete the question
    if (question.user.toString() !== decodedToken.id) {
      return response.status(403).json({ error: 'Not authorized to delete this question' });
    }

    // Remove the question from all quizzes it is associated with
    await Quiz.updateMany({ questions: questionId }, { $pull: { questions: questionId } });

    await question.remove();

    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: 'Invalid question ID' });
  }
});

questionsRouter.delete('/:quizId/:questionId', async (request, response) => {
  const quizId = request.params.quizId;
  const questionId = request.params.questionId;

  const token = request.token;
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token invalid' });
  }

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return response.status(404).json({ error: 'Quiz not found' });
  }

  if (quiz.user.toString() !== decodedToken.id) {
    return response.status(403).json({ error: 'Not authorized to modify questions in this quiz' });
  }

  const questionIndex = quiz.questions.findIndex((q) => q._id.toString() === questionId);
  if (questionIndex === -1) {
    return response.status(404).json({ error: 'Question not found in this quiz' });
  }

  quiz.questions.splice(questionIndex, 1); // Remove the question reference from the quiz's questions array
  await quiz.save();

  const question = await Question.findById(questionId);
  if (!question) {
    return response.status(404).json({ error: 'Question not found' });
  }

  const quizIndex = question.quizzes.findIndex((q) => q._id.toString() === quizId);
  if (quizIndex === -1) {
    return response.status(404).json({ error: 'Quiz not found in question' });
  }

  question.quizzes.splice(quizIndex, 1); // Remove the quiz reference from the question's quizzes array
  await question.save();

  response.status(204).end();
});

module.exports = questionsRouter;
