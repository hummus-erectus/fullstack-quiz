const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const path = require('path');
const app = express()
const cors = require('cors')
const quizzesRouter = require('./controllers/quizzes')
const questionsRouter = require('./controllers/questions')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info("connecting to MongoDB")

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/quizzes', middleware.userExtractor, quizzesRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.use(middleware.errorHandler)

module.exports = app