import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable'
import CreateBlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const sortedBlogs = [...blogs].sort((a, b) => a.likes - b.likes)

  useEffect(() => {
    dispatch(initializeBlogs())
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
      {!user && (
        <Togglable buttonLabel="log in" ref={loginFormRef}>
          <LoginForm setUser={setUser} />
        </Togglable>
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <CreateBlogForm user={user} />
          </Togglable>
        </div>
      )}

      <h2>Bloglist</h2>
      {user && (
        <div>
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      )}
      <button id="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default App

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
