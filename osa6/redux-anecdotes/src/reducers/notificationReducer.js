import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'toimii',
    reducers: {
        setFilter(state, action){
            return action.payload
        }
    }
})

export const {setFilter} = notificationSlice.actions
export default notificationSlice.reducer