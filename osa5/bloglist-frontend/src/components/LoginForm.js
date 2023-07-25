import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const loggedUser = await loginService.login({ username, password })
      console.log(loggedUser)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser),
      )
      console.log(loggedUser.token)
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      dispatch(showNotification(`logged in as '${loggedUser.username}'`, 5))
    } catch (error) {
      dispatch(showNotification('logging in failed' + error, 5))
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={(event) => setUsername(event.target.value)}
            id="username"
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
            id="password"
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

/*LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}*/

export default LoginForm

/* useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])*/
