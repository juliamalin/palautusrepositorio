import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(notification){
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  if(notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  return null
}

export default Notification