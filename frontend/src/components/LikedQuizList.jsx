import { Button } from './styles/Button.styled'
import { StyledQuizList } from './styles/QuizList.styled'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LikedQuizList = ({ individualUser }) => {
  const quizzes = useSelector(({ quiz }) => quiz)
  const user = individualUser

  if (!user) {
    return null
  }

  console.log(user)

  return (
    <StyledQuizList>
      <h3>Liked quizzes</h3>
      <ul>
        {user.likedQuizzes &&
        quizzes
          .filter((quiz) => user.likedQuizzes.includes(quiz.id))
          .map((quiz) => (
            <li className='quiz' key={quiz.id}>
              <Link to={`/quizzes/${quiz.id}`}><span className="quizTitle">{quiz.title}</span></Link>
              <Button>Remove</Button>
            </li>
          ))
        }
      </ul>
    </StyledQuizList>
  )
}

export default LikedQuizList