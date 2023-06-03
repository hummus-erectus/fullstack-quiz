import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeQuizzes, createQuiz, newLike, unLike, removeQuiz, newComment } from './reducers/quizReducer'
import { createQuestion, initializeQuestions, removeQuestionAction } from './reducers/questionsReducer'

// import { updateQuestionAction } from './reducers/questionsReducer'fremoveLi

import { removeUser, userLogin, updateUser } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import UserPage from './components/UserPage'
import QuizForm from './components/QuizForm'
import QuizList from './components/QuizList'
import Togglable from './components/Togglable'
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
import { Button } from './components/styles/Button.styled'

const theme = {
  colors: {
    primary: '#65C3C8',
    primaryContent: '#00393C',
    secondary: '#EF9FBC',
    secondaryContent: '#50001D',
    base: '#FAF7F5',
    baseContent: '291334'
  },
  mobile: '768px',
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showLoginForm, setShowLoginForm] = useState(true) // New state for login/signup form toggle

  const quizFormRef = useRef()
  const dispatch = useDispatch()
  const quizzes = useSelector(({ quiz }) => quiz)
  const user = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)
  // const questions = useSelector(({ questions }) => questions)

  useEffect(() => {
    dispatch(initializeQuizzes())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
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

  const handleSignUp = () => setShowLoginForm(true)


  const addQuiz = async (quizObject) => {
    quizFormRef.current.toggleVisibility()
    try {
      await dispatch(createQuiz(quizObject))
      dispatch(setNotification(`${quizObject.title} added`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }
  }

  const addLike = async (id) => {
    const quiz = quizzes.find((n) => n.id === id)
    try {
      await dispatch(newLike(id))
      dispatch(setNotification(`You liked "${quiz.title}"`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(`${quiz.title} was already removed from the server`, 'error', 5))
    }
  }

  const removeLike = async (id) => {
    const quiz = quizzes.find((n) => n.id === id)
    try {
      await dispatch(unLike(id))
      dispatch(setNotification(`You unliked "${quiz.title}"`, 'success', 5))
      dispatch(updateUser(user.id))
    } catch (error) {
      dispatch(setNotification(`${quiz.title} was already removed from the server`, 'error', 5))
    }
  }

  const addComment = async (id, content) => {
    console.log(content)
    try {
      await dispatch(newComment(id, content))
      dispatch(setNotification('Comment added', 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }
  }

  const deleteQuiz = async (id) => {
    const quiz = quizzes.find((n) => n.id === id)

    if (window.confirm(`Do you really want to delete ${quiz.title}?`)) {
      try {
        await dispatch(removeQuiz(id))
        dispatch(setNotification(`Successfully removed ${quiz.title}`, 'success', 5))
      } catch (error) {
        dispatch(setNotification(error.message, 'error', 5))
      }
    }
  }

  // Question dispatch functions

  const addQuestion = async (quizId, questionObject) => {
    try {
      await dispatch(createQuestion(quizId, questionObject)) // Dispatch createQuestion action with quizId and questionObject
      dispatch(setNotification('Question added', 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }
  }

  // const updateQuestion = async (questionId, updatedQuestion) => {
  //   try {
  //     await dispatch(updateQuestionAction(questionId, updatedQuestion)) // Dispatch updateQuestionAction with questionId and updatedQuestion
  //     dispatch(setNotification('Question updated', 'success', 5))
  //   } catch (error) {
  //     dispatch(setNotification(error.message, 'error', 5))
  //   }
  // }

  const removeQuestion = async (questionId, quizId) => {
    try {
      await dispatch(removeQuestionAction(questionId, quizId)) // Dispatch removeQuestionAction with questionId and quizId
      dispatch(setNotification('Question removed', 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }
  }

  const matchUser = useMatch('/users/:id')
  const individualUser = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchQuiz = useMatch('/quizzes/:id')
  const [individualQuiz, setIndividualQuiz] = useState(null)

  useEffect(() => {
    if (matchQuiz && quizzes.length > 0) {
      const quiz = quizzes.find((quiz) => quiz.id === matchQuiz.params.id)
      setIndividualQuiz(quiz)
    }
  }, [matchQuiz, quizzes])

  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
  const [selectedQuizId, setSelectedQuizId] = useState(null)
  const [questionsFetched, setQuestionsFetched] = useState(false)

  useEffect(() => {
    setQuestionsFetched(false) // Reset the flag when individualQuiz changes
  }, [selectedQuizId])

  useEffect(() => {
    if (selectedQuizId && !questionsFetched) {
      setIsLoadingQuestions(true)
      dispatch(initializeQuestions(selectedQuizId))
        .then(() => {
          setIsLoadingQuestions(false)
          setQuestionsFetched(true)
        })
        .catch((error) => {
          setIsLoadingQuestions(false)
          console.error(error)
        })
    }
  }, [dispatch, selectedQuizId, questionsFetched])

  useEffect(() => {
    if (individualQuiz) {
      setSelectedQuizId(individualQuiz.id)
    }
  }, [individualQuiz])

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        {user && <Navigation user={user} handleLogout={handleLogout} />}
        <Notification />
        <Container>
          <h1>Quiz App</h1>
          {!user ? ( // Render login form or signup form based on user state
            <>
              {!showLoginForm && (
                <>
                  <SignUpForm handleSignUp={handleSignUp} />
                  <Button onClick={() => setShowLoginForm(true)}>Login</Button> {/* Toggle to show login form */}
                </>
              )}
              {showLoginForm && (
                <>
                  <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                  />
                  <Button onClick={() => setShowLoginForm(false)}>Sign up</Button> {/* Toggle to show signup form */}
                </>
              )}
            </>
          ) : (
            <>
              <Routes>
                <Route path='/' element=
                  {
                    <>
                      <Togglable buttonLabel="new quiz" ref={quizFormRef}>
                        <QuizForm createQuiz={addQuiz} />
                      </Togglable>

                      <QuizList quizzes={quizzes}/>
                    </>
                  }
                />
                <Route path='/mypage/' element={<UserPage user={user} removeLike={removeLike}/>}/>
                <Route path='/users' element={<Users />}/>
                <Route path='/users/:id' element={<User individualUser={individualUser}/>}/>
                <Route path='/quizzes/:id' element={
                  <QuizView
                    individualQuiz={individualQuiz}
                    isLoading={isLoadingQuestions}
                    addLike={addLike}
                    removeLike={removeLike}
                    deleteQuiz={deleteQuiz}
                    addComment={addComment}
                    addQuestion={addQuestion}
                    removeQuestion={removeQuestion}
                  />
                }/>

              </Routes>
            </>
          )}
        </Container>
      </>
    </ThemeProvider>
  )
}

export default App
