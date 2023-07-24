import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { useParams } from 'react-router-dom'

const BlogList = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.user)
  console.log(users)
  const currentUser = users.find((u) => u.id === id)
  console.log(currentUser)

  if (!currentUser) {
    return null
  }

  return (
    <div>
      <h1>{currentUser.name}</h1>
      <h3>Added blogs</h3>
      <div>
        {currentUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </div>
    </div>
  )
}

export default BlogList
