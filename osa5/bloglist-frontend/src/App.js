import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const [newBlogLikes, setNewBlogLikes] = useState(0);
  const [okMessage, setOkMessage] = useState(null)



  console.log(user)

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
        likes: newBlogLikes,
      };
  
      const createdBlog = await blogService.create(newBlog);
  
      setBlogs([...blogs, createdBlog]);
  
      setNewBlogTitle('');
      setNewBlogAuthor('');
      setNewBlogUrl('');
      setNewBlogLikes(0);

      setOkMessage(`Blog '${newBlogTitle}' is now added`)
      setTimeout(()=>{
        setOkMessage(null)
      }, 5000)
    } catch (error) {
      console.error('Failed to create blog:', error);
    }
  }

  const createBlogForm = () => (
    <form onSubmit={handleCreateBlog}>
      <div>
        Title:
        <input
          type="text"
          value={newBlogTitle}
          onChange={(event) => setNewBlogTitle(event.target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={newBlogAuthor}
          onChange={(event) => setNewBlogAuthor(event.target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={newBlogUrl}
          onChange={(event) => setNewBlogUrl(event.target.value)}
        />
      </div>
      <div>
        Likes:
        <input
          type="number"
          value={newBlogLikes}
          onChange={(event) => setNewBlogLikes(Number(event.target.value))}
        />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  );
  

  return (
    <div>
      <h2>Login</h2>
      {!user && loginForm()}
      {errorMessage}
      <h2>Blogs</h2>
      {user && (
      <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <h2>create new</h2>
      {createBlogForm()}
      {okMessage}
      {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
      </div>
      )}
    </div>
  )
}

export default App