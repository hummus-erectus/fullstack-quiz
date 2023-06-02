const quizzesRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const Quiz = require('../models/quiz');
const User = require('../models/user');

quizzesRouter.get('/', async (request, response) => {
  try {
    const quizzes = await Quiz.find().populate('user', 'username _id');
    response.json(quizzes);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});


quizzesRouter.get('/:id', async (request, response) => {
  const quiz = await Quiz.findById(request.params.id).populate('user', 'username _id');
  if (quiz) {
    response.json(quiz);
  } else {
    response.status(404).end();
  }
});

quizzesRouter.post('/', async (request, response) => {
  const user = request.user;
  const token = request.token;
  const body = request.body;

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token invalid' });
  }

  if (!body.title) {
    return response.status(400).end();
  }

  if (!body.likes) {
    body.likes = 0;
  }

  const quiz = new Quiz({
    ...body,
    user: user._id,
  });

  const savedQuiz = await quiz.save();

  user.quizzes = user.quizzes.concat(savedQuiz._id);
  await user.save();

  const populatedQuiz = await Quiz.findById(savedQuiz._id).populate('user', 'username _id');

  response.status(201).json(populatedQuiz);
});

quizzesRouter.post('/:id/like', async (request, response) => {
  const quizId = request.params.id;
  const userId = request.user.id;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return response.status(404).json({ error: 'Quiz not found' });
    }

    // Check if the quiz is already liked by the user
    if (quiz.likedBy.includes(userId)) {
      return response.status(400).json({ error: 'Quiz already liked by the user' });
    }

    quiz.likedBy.push(userId);
    const savedQuiz = await quiz.save();
    const populatedQuiz = await Quiz.findById(savedQuiz._id).populate('user', 'username _id');

    const user = await User.findById(userId);
    user.likedQuizzes.push(quizId);
    await user.save();

    response.status(200).json(populatedQuiz);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});


quizzesRouter.post('/:id/unlike', async (request, response) => {
  const quizId = request.params.id;
  const userId = request.user.id;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return response.status(404).json({ error: 'Quiz not found' });
    }

    // Check if the quiz is not liked by the user
    if (!quiz.likedBy.includes(userId)) {
      return response.status(400).json({ error: 'Quiz is not liked by the user' });
    }

    quiz.likedBy = quiz.likedBy.filter((likedUserId) => likedUserId.toString() !== userId);
    const savedQuiz = await quiz.save();
    const populatedQuiz = await Quiz.findById(savedQuiz._id).populate('user', 'username _id');

    const user = await User.findById(userId);
    user.likedQuizzes = user.likedQuizzes.filter((likedQuizId) => likedQuizId.toString() !== quizId);
    await user.save();

    response.status(200).json(populatedQuiz);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});


quizzesRouter.delete('/:id', async (request, response) => {
  const quiz = await Quiz.findById(request.params.id);

  const user = request.user;

  if (!user || quiz.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'Operation not permitted' });
  }

  user.quizzes = user.quizzes.filter(q => q.toString() !== quiz.id.toString());

  await user.save();
  await quiz.remove();

  response.status(204).end();
});

quizzesRouter.put('/:id', async (request, response) => {
  const body = request.body;

  if (!body.title) {
    return response.status(400).end();
  }

  if (!body.likes) {
    body.likes = 0;
  }

  const quiz = {
    title: body.title,
    likes: body.likes,
    user: body.user.id,
  };

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(request.params.id, quiz, { new: true }).populate('user', 'username _id');
    response.json(updatedQuiz);
  } catch (error) {
    next(error);
  }
});

quizzesRouter.post('/:id/comments', async (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: 'Comment content is missing' });
  }

  const quiz = await Quiz.findById(request.params.id);

  if (!quiz) {
    return response.status(404).json({ error: 'Quiz not found' });
  }

  const comment = { content: body.content };
  quiz.comments.push(comment);

  const savedQuiz = await quiz.save()

  const populatedQuiz = await Quiz.findById(savedQuiz._id).populate('user', 'username _id');

  response.status(201).json(populatedQuiz);
});

module.exports = quizzesRouter;