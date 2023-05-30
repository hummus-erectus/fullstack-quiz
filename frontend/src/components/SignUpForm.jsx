import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button } from './styles/Button.styled'
import { Form } from './styles/Form.styled'
import signupService from '../services/signup'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'


const SignUpForm = ({ handleSignUp }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await signupService.signup({ username, password })
      handleSignUp()
      dispatch(setNotification(`${username} successfully signed up!`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5))
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Form>
      <h2>Create a new account</h2>
      <form onSubmit={handleSubmit}>
        <div className='input'>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div className='input'>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <Button type='submit'>Sign up</Button>
      </form>
    </Form>
  )
}

SignUpForm.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
}

export default SignUpForm
