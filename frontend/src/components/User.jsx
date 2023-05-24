import { useSelector } from 'react-redux'
import { StyledQuizList } from './styles/QuizList.styled'
import { Link } from 'react-router-dom'

const User = ({ individualUser }) => {
  const quizzes = useSelector(({ quiz }) => quiz)
  const user = individualUser

  if (!user) {
    return null
  }

  return (
    <StyledQuizList>
      <h2>{user.name}</h2>
      <h3>Added quizzes</h3>
      <ul>
        {quizzes
          .filter((quiz) => quiz.user.id === user.id)
          .map((quiz) => (
            <li className='quiz' key={quiz.id}>
              <Link to={`/quizzes/${quiz.id}`}><span className="quizTitle">{quiz.title}</span> by <span className="quizAuthor">{quiz.author}</span></Link>
            </li>
          ))
        }
      </ul>
    </StyledQuizList>
  )
}

export default User