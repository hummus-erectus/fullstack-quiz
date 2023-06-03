import LikedQuizList from './LikedQuizList'
import User from './User'

const UserPage = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <>
      <h2>Welcome, {user.username}</h2>
      <User individualUser={user}/>
      <LikedQuizList individualUser={user}/>
    </>
  )
}

export default UserPage