import { useState, useEffect, useRef } from 'react'
import AllBlogsList from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable'
import CreateBlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UsersList from './components/UsersList'
import { initializeUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link href="#" style={padding} to="/">
        blogs
      </Link>
      <Link href="#" style={padding} to="/users">
        users
      </Link>
    </div>
  )
}

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  //const sortedBlogs = [...blogs].sort((a, b) => a.likes - b.likes)

  const padding = {
    padding: 5,
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  console.log(blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        if (user && user.token) {
          blogService.setToken(user.token)
        }
      } catch (error) {
        console.log('Error parsing JSON:', error)
      }
    } else {
      setUser(null)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <h1>Blog app</h1>
      <Notification />
      <Router>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'lightgray',
          }}
        >
          <div>
            <Link style={padding} to="/">
              home
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
            <Link style={padding} to="/blogs">
              blogs
            </Link>
          </div>
          {!user && (
            <Togglable buttonLabel="log in" ref={loginFormRef}>
              <LoginForm setUser={setUser} />
            </Togglable>
          )}
          {user && <p>{user.name} logged in </p>}
          <button id="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <Routes>
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/blogs" element={user && <AllBlogsList user={user} />} />
          <Route path="/" element={user && <CreateBlogForm user={user} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
//      <Menu />

/*<Routes>
<Route path="/users" element={<User} />
</Routes>

//KORVATTU REDUXILLA

/*const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showNotification('Wrong credentials', 5))
    }
  }
  */

/*const handleCreateBlog = (blogObject) => {
    console.log(blogObject)
    blogService
      .create({ ...blogObject, user: user })
      .then((retunedBlog) => {
        setBlogs(blogs.concat(retunedBlog))
        dispatch(showNotification('Blog is now added', 5))
        blogFormRef.current.toggleVisibility()
      })
      .catch((error) => {
        dispatch(showNotification('Failed to create blog', 5))
      })
  }*/

/*const updateLikes = (id) => {
    const blog = blogs.find((b) => b.id === id)

     blogService.update(id, blog).then((returnedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    })
     .catch(error => {
      setErrorMessage(
        `Blog was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
     // setBlogs(blogs.filter(b => b.id !== id))
    })*/

/*const deleteBlog = (id) => {
    console.log(id)
    console.log(user.token)
    /*blogService
      .deleteItem(id, user.token)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id))
        dispatch(showNotification('Blog deleted succesfully', 5))
      })
      .catch((error) => {
        dispatch(showNotification('Failed to delete blog', 5))
      })
  }*/
