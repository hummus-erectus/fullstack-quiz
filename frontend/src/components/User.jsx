import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import users from '../services/users'
import UserQuizList from './UserQuizList'

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

  if (!user) {
    return null
  }

  return (
    <>
      <h2>{user.username}</h2>
      <UserQuizList user={user} />
    </>
  )
}

export default User
