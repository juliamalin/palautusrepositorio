import { showNotification } from '../reducers/notificationReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'

const AllBlogsList = ({ user, deleteBlog, showNotification }) => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => a.likes - b.likes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const deleteBlogItem = (id) => {
    try {
      deleteBlog(id, user.token)
    } catch (error) {
      showNotification('Blog delete failed', 5)
    }
  }
  console.log(user.username)
  console.log(sortedBlogs)

  return (
    <div>
      <h2>All Blogs</h2>
      {sortedBlogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          {blog.user.username === user.username && (
            <button id="delete-button" onClick={() => deleteBlogItem(blog.id)}>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

const mapDispatchToProps = {
  deleteBlog,
  showNotification,
}

const ConnectedBlogs = connect(null, mapDispatchToProps)(AllBlogsList)
export default ConnectedBlogs

//const [showDetails, setShowDetails] = useState(false)

/*const toggleDetails = () => {
    setShowDetails(!showDetails)
  }*/

//korvattu reduxilla

/*const handleLike = () => {
    blog.likes = blog.likes + 1
    update(blog.id)
  }*/

/*{showDetails && (
  <div>
    <p>Author: {blog.author}</p>
    <p>URL: {blog.url}</p>
    <p>Likes: {blog.likes}</p>
    <button
      id="like-button"
      onClick={() => updateLikes(blog.id)}
      className="like-button"
    >
      Like
    </button>
    <p>User: {blog.user.username}</p>
  </div>
)}*/

/*return sortedBlogs.map((blog) => (
  <div>
    {blog.title}
    <button id="view-button" onClick={toggleDetails}>
      {showDetails ? 'Hide' : 'View'}
    </button>
  </div>
))*/
