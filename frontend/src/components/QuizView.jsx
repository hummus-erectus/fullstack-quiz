import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import Togglable from './Togglable'
import { Button } from './styles/Button.styled'
import { ButtonAlt } from './styles/ButtonAlt.styled'
import { StyledQuizView } from './styles/QuizView.styled'

const QuizView = ({ individualQuiz, addLike, deleteQuiz, addComment }) => {
  const quiz = individualQuiz
  const user = useSelector(({ user }) => user)
  const navigate = useNavigate()
  const questionFormRef = useRef()

  // const showQuestionForm = () => {
  //   questionFormRef.current.toggleVisibility()
  // }

  const [comment, setComment] = useState('')

  const newComment = async (event) => {
    event.preventDefault()
    addComment(quiz.id, comment)
    setComment('')
  }


  if (!quiz) {
    return null
  }

  return (
    <StyledQuizView>
      <h2>{quiz.title}</h2>
      <p>{quiz.questions.length} {quiz.questions.length === 1? 'question' : 'questions'}</p>

      {quiz.user.username === user.username && <Togglable buttonLabel="Add Question" ref={questionFormRef}>
        <p>Question form here</p>
      </Togglable>}


      <p>{quiz.likes} likes <Button onClick={() => addLike(quiz.id)}>like</Button></p>
      <p>Added by <Link to={`/users/${user.id}`} className='username'>{quiz.user.username}</Link></p>
      {quiz.user.username === user.username && <ButtonAlt onClick={
        () => {
          deleteQuiz(quiz.id)
          navigate('/')
        }
      }>remove</ButtonAlt>}
      <div className='commentsContainer'>
        <h3>Comments</h3>
        {quiz.comments.length>0 ?
          <ul>
            {quiz.comments.map(comment =>
              (
                <li className='userComment' key={comment._id}>&quot;{comment.content}&quot;</li>
              )
            )}
          </ul>
          :
          (
            <p className='noComments'>No comments yet</p>
          )
        }
        <form onSubmit={newComment}>
          <input
            id="commentInput"
            type="text"
            value={comment}
            name="comment"
            placeholder='Type comment'
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