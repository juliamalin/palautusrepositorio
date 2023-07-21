import { useState } from 'react'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const CreateBlogForm = ({ user, createBlog, showNotification }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState(0)

  const addBlog = async (event) => {
    event.preventDefault()
    const content = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: newBlogLikes,
      user: user,
    }
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    createBlog(content)
    showNotification(`you created '${content.title}'`, 5)
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newBlogTitle}
            onChange={(event) => setNewBlogTitle(event.target.value)}
            id="title-input"
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlogAuthor}
            onChange={(event) => setNewBlogAuthor(event.target.value)}
            id="author-input"
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={newBlogUrl}
            onChange={(event) => setNewBlogUrl(event.target.value)}
            id="url-input"
          />
        </div>
        <div>
          Likes:
          <input
            type="number"
            value={newBlogLikes}
            onChange={(event) => setNewBlogLikes(Number(event.target.value))}
            id="likes-input"
          />
        </div>
        <button id="create-button" type="submit">
          Create Blog
        </button>
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  //createBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  createBlog,
  showNotification,
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(CreateBlogForm)
export default ConnectedBlogForm
