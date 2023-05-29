import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import Togglable from './Togglable'
import { Button } from './styles/Button.styled'
import { ButtonAlt } from './styles/ButtonAlt.styled'
import { StyledQuizView } from './styles/QuizView.styled'
import QuestionForm from './QuestionForm'
import PlayQuiz from './PlayQuiz'

const QuizView = ({ individualQuiz, addLike, deleteQuiz, addComment, isLoading, addQuestion, removeQuestion }) => {
  const quiz = individualQuiz
  const user = useSelector(({ user }) => user)
  const questions = useSelector(({ question }) => question)
  const navigate = useNavigate()
  const questionFormRef = useRef()

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

  if (isLoading) {
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
      <h2>{quiz.title}</h2>
      <p>{questions.length} {questions.length === 1 ? 'question' : 'questions'}</p>

      <Button onClick={handleStartQuiz}>Start Quiz</Button>

      {questions.length > 0 && (
        <Togglable buttonLabel="See Questions">
          {
            questions.map((question) => (
              <div key={question._id}>
                <p>{question.content}</p>
                <p>
                  {question.options.map((option) => (
                    <span key={option}>{option} </span>
                  ))}
                </p>
                {quiz.user.username === user.username &&
                  <Button onClick={() => removeQuestion(question._id, quiz.id)}>Remove Question</Button>
                }
              </div>
            ))
          }
        </Togglable>
      )}

      {quiz.user.username === user.username && (
        <Togglable buttonLabel="Add Question" ref={questionFormRef}>
          <QuestionForm addQuestion={addQuestion} quizId={quiz.id}/>
        </Togglable>
      )}

      <p>
        {quiz.likes} likes <Button onClick={() => addLike(quiz.id)}>like</Button>
      </p>
      <p>
        Added by <Link to={`/users/${user.id}`} className="username">{quiz.user.username}</Link>
      </p>
      {quiz.user.username === user.username && (
        <ButtonAlt
          onClick={() => {
            deleteQuiz(quiz.id)
            navigate('/')
          }}
        >
          remove
        </ButtonAlt>
      )}
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
            add comment
          </Button>
        </form>
      </div>
    </StyledQuizView>
  )
}

export default QuizView
