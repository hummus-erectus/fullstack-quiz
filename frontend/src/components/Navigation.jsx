import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StyledNavigation } from './styles/Navigation.styled'
// import { Container } from './styles/Container.styled'
import { Button } from './styles/Button.styled'
import { FaBars } from 'react-icons/fa'

const Navigation = ({ user }) => {
  const [showNavbar, setShowNavbar] = useState(false)
  const navigate = useNavigate()

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <StyledNavigation>
      <nav>
        <div className='nav-container'>
          <div className='logo-container'>
            <Link to="/" className='logo'>Quiz App</Link>
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <FaBars />
          </div>
          <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
              <li><Link to='/' onClick={() => setShowNavbar(false)}>Quizzes</Link></li>
              <li><Link to='/users' onClick={() => setShowNavbar(false)}>Users</Link></li>
              <li>{user && <p><Link onClick={() => setShowNavbar(false)} to="/mypage"><span>{user.username}</span></Link> logged in</p>}</li>
            </ul>
            {!user && (
            //   <Button onClick={() => {
            //     handleLogout()
            //     setShowNavbar(false)
            //   }} className="logoutButton">
            //     Logout
            //   </Button>
            // ) : (
              <Button onClick={() => {
                navigate('login')
                setShowNavbar(false)
              }} className="loginButton">
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>
    </StyledNavigation>
  )
}

export default Navigation