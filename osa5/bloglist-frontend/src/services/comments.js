import axios from 'axios'
const baseUrl = '/api/blogs/'

const getAll = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}${id}/comments`)
    return response.data
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

const create = async (newObject, id) => {
  try {
    const response = await axios.post(`${baseUrl}${id}/comments`, newObject)
    return response.data
  } catch (error) {
    console.error('Error adding comment:', error)
    throw error
  }
}

export default { getAll, create }
