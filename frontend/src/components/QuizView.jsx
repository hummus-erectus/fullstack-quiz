import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { Button } from './styles/Button.styled'
import { ButtonAlt } from './styles/ButtonAlt.styled'
import { StyledQuizView } from './styles/QuizView.styled'
import QuestionForm from './QuestionForm'
import PlayQuiz from './PlayQuiz'
import EditableField from './EditableField'
import { updateQuiz, newComment, newLike, unLike, initializeQuiz } from '../reducers/activeQuizReducer'
import QuestionTogglable from './QuestionTogglable'
import EditQuestionForm from './EditQuestionForm'

const QuizView = ({ deleteQuiz, addQuestion, removeQuestion, updateQuestion }) => {
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true)
  const user = useSelector(({ user }) => user)
  const navigate = useNavigate()
  const questionFormRef = useRef()
  const editQuestionFormRefs = useRef({})
  const dispatch = useDispatch()

  const { quizId } = useParams()

  const quiz = useSelector(({ activeQuiz }) => activeQuiz)

  const [originalTitle, setOriginalTitle] = useState('')
  const [originalDescription, setOriginalDescription] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingQuestions(true)
      try {
        await dispatch(initializeQuiz(quizId))
        setIsLoadingQuestions(false)
      } catch (error) {
        setIsLoadingQuestions(false)
        console.error(error)
        navigate('/404')
      }
    }
    fetchData()
  }, [quizId, dispatch, navigate])

  useEffect(() => {
    if (quiz) {
      setOriginalTitle(quiz.title)
      quiz.description ? setOriginalDescription(quiz.description) : setOriginalDescription('')
    }
  }, [quiz])

  const handleTitleChange = async (value) => {
    const changedQuiz = { ...quiz, title: value }
    await dispatch(updateQuiz(quiz.id, changedQuiz))
  }

  const handleDescriptionChange = async (value) => {
    const changedQuiz = { ...quiz, description: value }
    await dispatch(updateQuiz(quiz.id, changedQuiz))
  }

  const handleDeleteQuiz = async (id) => {
    if (window.confirm('Do you really want to delete this quiz?')) {
      await deleteQuiz(id)
      navigate('/')
    }
  }

  const [startQuiz, setStartQuiz] = useState(false)

  const [comment, setComment] = useState('')

  const addLike = async (id) => {
    try {
      await dispatch(newLike(id))
      dispatch(setNotification(`You liked "${quiz.title}"`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(`${quiz.title} was already removed from the server`, 'error', 5))
    }
  }

  const removeLike = async (id) => {
    try {
      await dispatch(unLike(id))
      dispatch(setNotification(`You unliked "${quiz.title}"`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(`${quiz.title} was already removed from the server`, 'error', 5))
    }
  }

  const handleEditQuestionSave = async (questionId) => {
    const editQuestionFormRef = editQuestionFormRefs.current[questionId]

    if (editQuestionFormRef) {
      editQuestionFormRef.toggleVisibility()
    }

    try {
      await dispatch(initializeQuiz(quizId))
    } catch (error) {
      console.error(error)
      navigate('/404')
    }

  }

  const addComment = async (event) => {
    event.preventDefault()
    await dispatch(newComment(quiz.id, comment))
    setComment('')
  }

  const shuffleArray = (array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  if (!quiz) {
    return null
  }

  if (isLoadingQuestions) {
    return <p>Loading quiz...</p>
  }

  const handleStartQuiz = () => {
    setStartQuiz(true)
  }

  if (startQuiz) {
    return <PlayQuiz questions={quiz.questions} />
  }


  return (
    <StyledQuizView>
      {quiz.user.username === user.username ?
        <>
          <EditableField
            initialValue={quiz.title}
            onChange={handleTitleChange}
            tagName="h2"
            originalValue={originalTitle}
            required={true}
          />
          <EditableField
            initialValue={quiz.description}
            onChange={handleDescriptionChange}
            tagName="p"
            originalValue={originalDescription}
            required={false}
            placeholder="Add a description"
          />
        </>
        :
        <>
          <h2>{quiz.title}</h2>
          {quiz.description && <p>{quiz.description}</p>}
        </>
      }

      <p>Added by <Link to={`/users/${quiz.user.id}`} className="username">{quiz.user.username}</Link></p>

      <p>{quiz.questions.length} {quiz.questions.length === 1 ? 'question' : 'questions'}</p>

      {quiz.questions.length > 0 && (
        <>
          <Button onClick={handleStartQuiz}>Start quiz</Button>
          <Togglable buttonLabel="See questions">
            {
              quiz.questions.map((question) => (
                <QuestionTogglable key={question._id} label={question.content}>
                  <ul className="options">
                    {shuffleArray(question.options).map((option) => (
                      <li className="option" key={`${question._id}-${option.optionId}`}>
                        {option.content}
                      </li>
                    ))}
                  </ul>
                  {quiz.user.username === user.username && (
                    <Togglable buttonLabel="Edit question" ref={(ref) => (editQuestionFormRefs.current[question._id] = ref)}>
                      <EditQuestionForm
                        question={question}
                        updateQuestion={updateQuestion}
                        onSave={() => handleEditQuestionSave(question._id)} // Pass the onSave callback
                      />
                    </Togglable>
                  )}
                  {quiz.user.username === user.username &&
                    <Button onClick={() => removeQuestion(question._id, quiz.id)}>Remove Question</Button>
                  }
                </QuestionTogglable>
              ))
            }
          </Togglable>
        </>
      )}

      {quiz.user.username === user.username && (
        <Togglable buttonLabel="Add question" ref={questionFormRef}>
          <QuestionForm addQuestion={addQuestion} quizId={quiz.id}/>
        </Togglable>
      )}

      {quiz.user.username === user.username && (
        <ButtonAlt onClick={() => handleDeleteQuiz(quiz.id)}>
          Remove quiz
        </ButtonAlt>
      )}

      <p>
        {quiz.likedBy ? quiz.likedBy.length : '0'} likes{' '}
        {quiz.likedBy && quiz.likedBy.includes(user.id) ? (
          <Button onClick={() => removeLike(quiz.id)}>Unlike</Button>
        ) : (
          <Button onClick={() => addLike(quiz.id)}>Like</Button>
        )}
      </p>
      <div className="commentsContainer">
        <h3>Comments</h3>
        {quiz.comments.length > 0 ? (
          <ul>
            {quiz.comments.map((comment) => (
              <li className="userComment" key={comment._id}>&quot;{comment.content}&quot;</li>
            ))}
          </ul>
        ) : (
          <p className="noComments">No comments yet</p>
        )}
        <form onSubmit={addComment}>
          <input
            id="commentInput"
            type="text"
            value={comment}
            name="comment"
            placeholder="Type comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <Button type="submit" className="submitButton">
            Add comment
          </Button>
        </form>
      </div>
    </StyledQuizView>
  )
}

export default QuizView
