import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import users from '../services/users'
import UserQuizList from './UserQuizList'
import LikedQuizList from './LikedQuizList'

const User = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchIndividualUser = async () => {
      setIsLoading(true)
      try {
        const fetchedUser = await users.getIndividual(userId)
        setUser(fetchedUser)
      } catch (error) {
        console.log(error)
        navigate('/404')
      } finally {
        setIsLoading(false)
      }
    }
    fetchIndividualUser()
  }, [userId])

  if (isLoading) {
    return <p>Loading user data...</p>
  }

  if (!user) {
    return null
  }

  return (
    <>
      <h2>{user.username}</h2>
      <UserQuizList user={user} />
      <LikedQuizList individualUser={user} />
    </>
  )
}

export default User
