import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Togglable from './Togglable'
import { Button } from './styles/Button.styled'
import { ButtonAlt } from './styles/ButtonAlt.styled'
import { StyledQuizView } from './styles/QuizView.styled'
import QuestionForm from './QuestionForm'
import PlayQuiz from './PlayQuiz'
import EditableField from './EditableField'
import { updateQuiz } from '../reducers/quizReducer'
import { initializeQuestions } from '../reducers/questionsReducer'
import QuestionTogglable from './QuestionTogglable'
import quizzes from '../services/quizzes'

const QuizView = ({ addLike, removeLike, deleteQuiz, addComment, addQuestion, removeQuestion }) => {
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true)
  const user = useSelector(({ user }) => user)
  const questions = useSelector(({ question }) => question)
  const navigate = useNavigate()
  const questionFormRef = useRef()
  const dispatch = useDispatch()

  const { quizId } = useParams()

  const [quiz, setQuiz] = useState(null)


  const [originalTitle, setOriginalTitle] = useState('')
  const [originalDescription, setOriginalDescription] = useState('')

  useEffect(() => {
    const fetchIndividualQuiz = async () => {
      const fetchedQuiz = await quizzes.getIndividual(quizId)
      setQuiz(fetchedQuiz)
    }
    fetchIndividualQuiz()
  }, [quizId])

  useEffect(() => {
    if (quiz) {
      setIsLoadingQuestions(true)
      dispatch(initializeQuestions(quiz.id))
        .then(() => {
          setIsLoadingQuestions(false)
        })
        .catch((error) => {
          setIsLoadingQuestions(false)
          console.error(error)
        })
    }
  }, [dispatch, quiz])

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

  const [startQuiz, setStartQuiz] = useState(false)

  const [comment, setComment] = useState('')

  const newComment = async (event) => {
    event.preventDefault()
    addComment(quiz.id, comment)
    setComment('')
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
    return <PlayQuiz questions={questions} />
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

      <p>Added by <Link to={`/users/${user.id}`} className="username">{quiz.user.username}</Link></p>

      <p>{questions.length} {questions.length === 1 ? 'question' : 'questions'}</p>

      {questions.length > 0 && (
        <>
          <Button onClick={handleStartQuiz}>Start quiz</Button>
          <Togglable buttonLabel="See questions">
            {
              questions.map((question) => (
                <QuestionTogglable key={question._id} label={question.content}>
                  <p>
                    {question.options.map((option) => (
                      <span key={option.optionId}>{option.content} </span>
                    ))}
                  </p>
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
        <ButtonAlt
          onClick={() => {
            deleteQuiz(quiz.id)
            navigate('/')
          }}
        >
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
        <form onSubmit={newComment}>
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
