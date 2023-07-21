import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const createUser = ({ username, password }) => {
  return async (dispatch) => {
    const newUser = await loginService.login({ username, password })
    dispatch(setUser(newUser))
    return newUser
  }
}

export const { setUser } = userSlice.actions

export default userSlice.reducer
