import { StyledQuizList } from './styles/QuizList.styled'
import { Link } from 'react-router-dom'
import { MdRemoveCircleOutline } from 'react-icons/md'

const LikedQuizList = ({ individualUser, removeLike, editable }) => {
  const user = individualUser

  if (!user || !user.likedQuizzes || user.likedQuizzes.length === 0) {
    return null
  }

  const handleRemoveLike = (id) => {
    if (window.confirm('Do you really want to unlike this quiz?')) {
      removeLike(id)
    }
  }

  return (
    <StyledQuizList>
      <h3>Liked quizzes</h3>
      <ul>
        {user.likedQuizzes &&
          user.likedQuizzes.map((quiz) => (
            <li className='quiz' key={quiz.id}>
              <Link to={`/quizzes/${quiz.id}`}>
                <span className="quizTitle">{quiz.title}</span>
              </Link>
              {editable && <span onClick={() => handleRemoveLike(quiz.id)} className="clickable-icon">
                <MdRemoveCircleOutline />
              </span>}
            </li>
          ))}
      </ul>
    </StyledQuizList>
  )
}

export default LikedQuizList
