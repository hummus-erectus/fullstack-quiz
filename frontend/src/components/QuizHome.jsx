import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { initializeQuizzes, createQuiz } from '../reducers/quizReducer'
import QuizList from './QuizList'
import QuizForm from './QuizForm'
import Togglable from './Togglable'

const QuizHome = () => {
  const quizFormRef = useRef()
  const dispatch = useDispatch()
  const quizzes = useSelector(({ quiz }) => quiz)

  useEffect(() => {
    dispatch(initializeQuizzes())
  }, [dispatch])

  const addQuiz = async (quizObject) => {
    quizFormRef.current.toggleVisibility()
    try {
      await dispatch(createQuiz(quizObject))
      dispatch(setNotification(`${quizObject.title} added`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }
  }

  return (
    <>
      <QuizList quizzes={quizzes} />
      <Togglable buttonLabel="new quiz" ref={quizFormRef}>
        <QuizForm createQuiz={addQuiz} />
      </Togglable>
    </>
  )
}

export default QuizHome
