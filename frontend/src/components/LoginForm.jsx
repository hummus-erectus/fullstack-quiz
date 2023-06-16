import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Button } from './styles/Button.styled'
import { Form } from './styles/Form.styled'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {

  const navigate = useNavigate()

  return (
    <Form>
      <h2>Login to application</h2>
      <form onSubmit={handleSubmit}>
        <div className='input'>
        username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div className='input'>
        password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
      <Button onClick={() => navigate('/signup')}>Sign up</Button>
    </Form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
