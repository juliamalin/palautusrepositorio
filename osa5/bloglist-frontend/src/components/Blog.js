import { useState } from 'react'
import { likeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const Blog = ({ blog, user, likeBlog, deleteBlog, showNotification }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const updateLikes = (id) => {
    try {
      likeBlog(id)
    } catch (error) {
      showNotification('Blog was already removed from server', 5)
    }
  }

  //korvattu reduxilla

  /*const handleLike = () => {
    blog.likes = blog.likes + 1
    update(blog.id)
  }*/

  const deleteBlogItem = (id) => {
    try {
      deleteBlog(id, user.token)
    } catch (error) {
      showNotification('Blog delete failed', 5)
    }
  }

  return (
    <div>
      {blog.title}
      <button id="view-button" onClick={toggleDetails}>
        {showDetails ? 'Hide' : 'View'}
      </button>
      {blog.user.username === user.username && (
        <button id="delete-button" onClick={() => deleteBlogItem(blog.id)}>
          Delete
        </button>
      )}
      {showDetails && (
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
      )}
    </div>
  )
}

const mapDispatchToProps = {
  deleteBlog,
  showNotification,
  likeBlog,
}

const ConnectedBlogs = connect(null, mapDispatchToProps)(Blog)
export default ConnectedBlogs
