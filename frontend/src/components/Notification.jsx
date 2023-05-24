import { useSelector } from 'react-redux'
import { StyledNotification } from './styles/Notification.styled'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  return notification.message && (
    <StyledNotification type={notification.type}>
      {notification.message}
    </StyledNotification>
  )
}

export default Notification