import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LikedQuizList from './LikedQuizList'
import { updateUser } from '../reducers/userReducer'
import UserQuizList from './UserQuizList'
import { Button } from './styles/Button.styled'

const UserPage = ({ removeLike, handleLogout }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      await dispatch(updateUser(user.id))
      setIsLoading(false)
    }

    fetchUser()
  }, [dispatch, user.id])

  const confirmLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      handleLogout()
      navigate('/')
    }
  }

  if (isLoading || !user) {
    return <p>Loading user data...</p>
  }

  return (
    <>
      <h2>Welcome, {user.username}</h2>
      <UserQuizList user={user}/>
      <LikedQuizList individualUser={user} removeLike={removeLike} editable/>
      <Button onClick={() => {
        confirmLogout()
      }}>
        Logout
      </Button>
    </>
  )
}

export default UserPage