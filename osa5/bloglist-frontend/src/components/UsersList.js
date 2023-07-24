import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const users = useSelector((state) => state.user)
  console.log(users)

  const dispatch = useDispatch()

  return (
    <div>
      <h1>Users</h1>
      <h3>Blogs created</h3>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>, lukumäärä:{' '}
            {user.blogs.length}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersList
