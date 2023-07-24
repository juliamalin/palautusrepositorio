import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
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
    const users = await userService.getAll()
    dispatch(setUser(users))
  }
}

export default userSlice.reducer

//appendUser -actionia ei tällä hetkellä käytetä missään
