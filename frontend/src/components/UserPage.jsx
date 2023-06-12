import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LikedQuizList from './LikedQuizList'
import { updateUser } from '../reducers/userReducer'
// import User from './User'

const UserPage = ({ removeLike }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      await dispatch(updateUser(user.id))
      setIsLoading(false)
    }

    fetchUser()
  }, [dispatch, user.id])

  if (isLoading || !user) {
    return <p>Loading user data...</p>
  }

  return (
    <>
      <h2>Welcome, {user.username}</h2>
      {/* <User individualUser={user}/> */}
      <LikedQuizList individualUser={user} removeLike={removeLike}/>
    </>
  )
}

export default UserPage