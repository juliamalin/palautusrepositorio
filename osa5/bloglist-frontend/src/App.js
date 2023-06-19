import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable'
import CreateBlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [okMessage, setOkMessage] = useState(null)
  const [visible, setVisible] = useState(false)

  console.log(user)

  const sortedBlogs = blogs.sort((a,b) => a.likes - b.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  const handleCreateBlog = (blogObject) => {
    console.log(blogObject)
    blogService
      .create({ ...blogObject, user: user })
      .then(retunedBlog => {
        setBlogs(blogs.concat(retunedBlog))
        setOkMessage('Blog is now added')
        setTimeout(() => {
          setOkMessage(null)
        }, 5000)
        toggleVisibility()
      })
      .catch ((error) => {
        console.error('Failed to create blog:', error)
      })
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikes = (id) => {
    const blog = blogs.find(b => b.id === id)

    blogService
      .update(id, blog).then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
    /* .catch(error => {
      setErrorMessage(
        `Blog was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
     // setBlogs(blogs.filter(b => b.id !== id))
    })*/
  }

  const deleteBlog = (id) => {
    console.log(id)
    console.log(user.token)
    blogService
      .deleteItem(id, user.token)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        setOkMessage('Blog deleted successfully')
        setTimeout(() => {
          setOkMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.error('Failed to delete blog:', error)
      })
  }




  return (
    <div>
      <h1>Blog app</h1>
      {errorMessage}
      {!user &&
        <Togglable
          buttonLabel="log in"
          visible={setVisible}
          toggleVisibility={toggleVisibility}
        >
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user &&
        <div>
          <p>{user.name} logged in</p>
          <Togglable
            visible={visible}
            toggleVisibility={toggleVisibility}
            buttonLabel="create new blog"
          >
            <CreateBlogForm createBlog={handleCreateBlog} user={user} />
          </Togglable>
        </div>
      }

      <h2>Bloglist</h2>
      {user && (
        <div>
          {okMessage}
          {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} user={user} update={updateLikes} handleDeleteBlog={deleteBlog}/>
          )}
        </div>

      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default App