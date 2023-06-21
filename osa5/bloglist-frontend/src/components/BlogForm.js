import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ createBlog, user }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState(0)


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: newBlogLikes,
      user: user
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return(
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
        Title:
          <input
            type="text"
            value={newBlogTitle}
            onChange={(event) => setNewBlogTitle(event.target.value)}
            id='title-input'
          />
        </div>
        <div>
        Author:
          <input
            type="text"
            value={newBlogAuthor}
            onChange={(event) => setNewBlogAuthor(event.target.value)}
            id='author-input'
          />
        </div>
        <div>
        URL:
          <input
            type="text"
            value={newBlogUrl}
            onChange={(event) => setNewBlogUrl(event.target.value)}
            id='url-input'
          />
        </div>
        <div>
        Likes:
          <input
            type="number"
            value={newBlogLikes}
            onChange={(event) => setNewBlogLikes(Number(event.target.value))}
            id='likes-input'
          />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default CreateBlogForm
