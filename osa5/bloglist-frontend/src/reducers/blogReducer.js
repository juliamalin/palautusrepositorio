import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const blogToChange = state.blogs.find((b) => b.id === id)
    const likedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    }
    const changedBlog = await blogService.update(id, likedBlog)
    dispatch(setBlogs(state.blogs.map((b) => (b.id !== id ? b : changedBlog))))
  }
}

export const deleteBlog = (id, token) => {
  return async (dispatch, getState) => {
    const state = getState()
    await blogService.deleteItem(id, token)
    dispatch(setBlogs(state.blogs.filter((b) => b.id !== id)))
  }
}

export default blogSlice.reducer
