import { useEffect, useState } from 'react'
import { StyledQuizList } from './styles/QuizList.styled'
import { Link, useParams } from 'react-router-dom'
import users from '../services/users'

const User = () => {
  const { userId } = useParams()

  const [user, setUser] = useState(null)



  useEffect(() => {
    const fetchIndividualUser = async () => {
      const fetchedUser = await users.getIndividual(userId)
      setUser(fetchedUser)
    }
    fetchIndividualUser()
  }, [userId])

  console.log(user)

  if (!user) {
    return null
  }

  return (
    <StyledQuizList>
      <h2>{user.username}</h2>
      <h3>Added quizzes</h3>
      <ul>
        {user.quizzes
          .map((quiz) => (
            <li className='quiz' key={quiz.id}>
              <Link to={`/quizzes/${quiz.id}`}><span className="quizTitle">{quiz.title}</span></Link>
            </li>
          ))
        }
      </ul>
    </StyledQuizList>
  )
}

export default User