import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    appendUser(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setUser, appendUser } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      console.log(users)
      dispatch(setUser(users))
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
}

export default userSlice.reducer

//appendUser -actionia ei tällä hetkellä käytetä missään
