import { createContext } from 'react'
import { useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'CREATE': 
        setTimeout(() => {
            action.payload.dispatch({ type: 'CLEAR' })
        }, action.payload.duration * 1000)
        return action.payload.message
      case 'VOTE':
        setTimeout(() => {
            action.payload.dispatch({ type: 'CLEAR' })
        }, action.payload.duration * 1000)
        return action.payload.message
      case 'CLEAR':
        return ''
      default: 
        return state
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, "")

    return (
        <NotificationContext.Provider value={[notification, dispatch]}>
            {props.children}
        </NotificationContext.Provider>
        )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
  }

  export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
  }

export default NotificationContext