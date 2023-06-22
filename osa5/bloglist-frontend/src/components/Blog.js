import { useState } from 'react'

const Blog = ({ blog, user, update, handleDeleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = () => {
    blog.likes = blog.likes + 1
    update(blog.id)
  }
  const deleteBlog = () => {
    handleDeleteBlog(blog.id)
  }

  return (

    <div>
      {blog.title}
      <button  id="view-button" onClick={toggleDetails}>
        {showDetails ? 'Hide' : 'View'}
      </button>
      {blog.user.username === user.username && (
        <button id="delete-button" onClick={deleteBlog}>Delete</button>
      )}
      {showDetails && (
        <div>
          <p>Author: {blog.author}</p>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <button  id="like-button" onClick={() => handleLike()} className="like-button">Like</button>
          <p>User: {blog.user.username}</p>
        </div>
      )}
    </div>
  )
}

export default Blog