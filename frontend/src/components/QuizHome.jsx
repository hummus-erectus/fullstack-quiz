import { useEffect, useRef, useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      setIsLoading(true)
      try {
        await dispatch(initializeQuizzes())
      } catch (error) {
        dispatch(setNotification(error.message, 'error', 5))
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuizzes()
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

  if (isLoading) {
    return <p>Loading quizzes...</p>
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
