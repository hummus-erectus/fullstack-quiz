import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LikedQuizList from './LikedQuizList'
import { updateUser } from '../reducers/userReducer'
// import User from './User'

const UserPage = ({ removeLike }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(updateUser(user.id))
  }, [dispatch])

  if (!user) {
    return null
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