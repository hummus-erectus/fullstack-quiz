import userService from '../services/users'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from './styles/Table.styled'

const Users = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const usersData = await userService.getAll()
        setUsers(usersData)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleRowClick = (id) => {
    navigate(`/users/${id}`)
  }

  if (isLoading) {
    return <p>Loading user data...</p>
  }

  return (
    <>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>No. of Quizzes Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => handleRowClick(user.id)}>
              <td className='username'>{user.username}</td>
              <td className='count'>{user.quizzes.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Users
