import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { unLike, removeQuiz } from './reducers/quizReducer'
import { createQuestion, removeQuestionAction, updateQuestionAction } from './reducers/activeQuizReducer'
import { removeUser, userLogin, updateUser } from './reducers/userReducer'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import UserPage from './components/UserPage'
import loginService from './services/login'
import tokenService from './services/tokenService'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import { initializeUsers } from './reducers/usersReducer'
import QuizView from './components/QuizView'
import Navigation from './components/Navigation'
import GlobalStyles from './components/styles/Global'
import { ThemeProvider } from 'styled-components'
import { Container } from './components/styles/Container.styled'
import SignUpForm from './components/SignUpForm'
import QuizHome from './components/QuizHome'
import NotFound from './components/NotFound'

const theme = {
  colors: {
    primary: '#65C3C8',
    primaryContent: '#00393C',
    secondary: '#EF9FBC',
    secondaryContent: '#50001D',
    base: '#FAF7F5',
    baseContent: '#291334',
    baseHighlight: '#EFEAE6'
  },
  mobile: '600px',
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const quizzes = useSelector(({ quiz }) => quiz)
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(initializeUsers())
    const loggedUserJSON = window.localStorage.getItem('loggedQuizUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userLogin(user))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedQuizUser', JSON.stringify(user))

      await dispatch(userLogin(user))
      setUsername('')
      setPassword('')
      tokenService.setToken(user.token)
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedQuizUser')
    dispatch(removeUser(null))
  }

  const removeLike = async (id) => {
    const quiz = quizzes.find((n) => n.id === id)
    if (quiz) {
      try {
        await dispatch(unLike(id))
        dispatch(setNotification(`You unliked "${quiz.title}"`, 'success', 5))
        dispatch(updateUser(user.id))
      } catch (error) {
        dispatch(setNotification(`${quiz.title} was already removed from the server`, 'error', 5))
      }
    }
  }

  const deleteQuiz = async (id) => {
    const quiz = quizzes.find((n) => n.id === id)

    try {
      await dispatch(removeQuiz(id))
      dispatch(setNotification(`Successfully removed ${quiz.title}`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }

  }

  const addQuestion = async (quizId, questionObject) => {
    try {
      await dispatch(createQuestion(quizId, questionObject))
      dispatch(setNotification('Question added', 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }
  }

  const updateQuestion = async (questionId, updatedQuestion) => {
    try {
      await dispatch(updateQuestionAction(questionId, updatedQuestion))
      dispatch(setNotification('Question updated', 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }
  }

  const removeQuestion = async (questionId, quizId) => {
    try {
      await dispatch(removeQuestionAction(questionId, quizId))
      dispatch(setNotification('Question removed', 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Navigation user={user} />
        <Notification />
        <Container>
          <>
            <Routes>
              <Route path='/' element={<QuizHome />}/>
              <Route
                path='/mypage'
                element={
                  user ? (
                    <UserPage removeLike={removeLike} handleLogout={handleLogout}/>
                  ) : (
                    <Navigate to='/login' replace />
                  )
                }
              />
              <Route path='/users' element={<Users />}/>
              <Route path='/users/:userId' element={<User />}/>
              <Route path='/quizzes/:quizId' element={
                <QuizView
                  deleteQuiz={deleteQuiz}
                  addQuestion={addQuestion}
                  updateQuestion={updateQuestion}
                  removeQuestion={removeQuestion}
                />
              }/>
              <Route
                path="/login"
                element={user ? <Navigate to="/" replace /> :
                  <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                  />
                }
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/" replace /> : <SignUpForm />}
              />
              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route path="/404" element={<NotFound />} />
            </Routes>
          </>
        </Container>
      </>
    </ThemeProvider>
  )
}

export default App
