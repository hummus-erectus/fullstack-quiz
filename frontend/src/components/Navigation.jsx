import { Link } from 'react-router-dom'
import { StyledNavigation } from './styles/Navigation.styled'
import { Container } from './styles/Container.styled'
import { Flex } from './styles/Flex.styled'
import { Button } from './styles/Button.styled'

const Navigation = ({ user, handleLogout }) => {

  return (
    <StyledNavigation>
      <Container>
        <nav>
          <Flex>
            <Link to="/">Quizzes</Link>
            <Link to="/users">Users</Link>
          </Flex>
          <Link to="/" className='logo'>Quiz App</Link>
          <Flex>
            <p><Link to="/mypage"><span>{user.username}</span></Link> logged in</p>
            <Button onClick={handleLogout} className="logoutButton">
              logout
            </Button>
          </Flex>
        </nav>
      </Container>
    </StyledNavigation>
  )
}

export default Navigation