import { StyledQuizList } from './styles/QuizList.styled'
import { Link } from 'react-router-dom'

const UserQuizList = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <StyledQuizList>
      <h3>Added quizzes</h3>
      <ul>
        {user.quizzes.map((quiz) => (
          <li className="quiz" key={quiz.id}>
            <Link to={`/quizzes/${quiz.id}`}>
              <span className="quizTitle">{quiz.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </StyledQuizList>
  )
}

export default UserQuizList
