import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }


  if(props.notification) {
    return (
      <div style={style}>
        {props.notification.message}
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification


//versio ilman connectia
/*const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }


  if(notification) {
    return (
      <div style={style}>
        {notification.message}
      </div>
    )
  }
  return null
}

export default Notification*/