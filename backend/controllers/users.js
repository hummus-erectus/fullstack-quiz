const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  if (!password) {
    return response.status(400).json({ error: 'You must provide a password' })
  }

  if (!passwordRegex.test(password)) {
    return response.status(400).json({
      error:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit',
    })
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    if (error.name === 'ValidationError') {
      if (error.errors.username.kind === 'unique') {
        return response.status(409).json({ error: 'Username is already taken' })
      }
      return response.status(400).json({ error: error.message })
    }
    throw error
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('quizzes', 'title').populate('likedQuizzes', 'title');
  if (user) {
    response.json(user);
  } else {
    response.status(404).end();
  }
});

module.exports = usersRouter;