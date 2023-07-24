import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import commentService from '../services/comments'

const BlogView = () => {
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const [comments, setComments] = useState([])
  const currentBlog = blogs.find((b) => b.id === id)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsData = await commentService.getAll(currentBlog.id)
        setComments(commentsData)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        dispatch(showNotification('Failed to fetch comments', 'error'))
      }
    }
    fetchData()
  }, [currentBlog.id, dispatch])

  const addComment = (event) => {
    //allaoleva estää lomakkeen lähetyksen oletusarvoisen toiminnan
    event.preventDefault()
    console.log('button clicked', event.target)
    const commentObject = {
      content: newComment,
      id: comments.length + 1,
    }
    commentService.create(commentObject, currentBlog.id)
    setComments(comments.concat(commentObject))
    setNewComment('')
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

  const updateLikes = (id) => {
    try {
      dispatch(likeBlog(id))
    } catch (error) {
      dispatch(showNotification('Blog was already removed from server', 5))
    }
  }

  if (!currentBlog) {
    return null
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{currentBlog.title}</h1>
      <div key={currentBlog.id}>
        {currentBlog.url}
        <br />
        likes: {currentBlog.likes}
        <button
          id="like-button"
          onClick={() => updateLikes(currentBlog.id)}
          className="like-button"
        >
          Like
        </button>
        <br />
        added by {currentBlog.author}
        <br />
        <h3>Comments</h3>
        <form onSubmit={addComment}>
          <input value={newComment} onChange={handleCommentChange} />
          <button type="submit">send</button>
        </form>
        {comments.length > 0 ? (
          <ul>
            {comments.map((c) => (
              <li key={c.id}>{c.content}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  )
}

export default BlogView
