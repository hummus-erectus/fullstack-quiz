import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import quizReducer from './reducers/quizReducer'
import questionsReducer from './reducers/questionsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    quiz: quizReducer,
    question: questionsReducer,
    user: userReducer,
    users: usersReducer
  }
})

export default store