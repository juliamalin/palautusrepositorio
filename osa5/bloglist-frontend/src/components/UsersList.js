import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UsersList = () => {
  const users = useSelector((state) => state.user)
  console.log(users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <h3>Blogs created</h3>
      <Table striped>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}></Link>
              </td>
              <td>
                Author: {user.name} Amount of blogs: {user.blogs.length}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersList
