import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification) {
    return <Alert variant="success">{notification.message} </Alert>
  }
  return null
}

export default Notification
