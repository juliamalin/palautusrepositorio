import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

let timeoutId = null;

export const showNotification = (message, duration) => (dispatch) => {
  const notification = { message, duration };

  dispatch(setNotification(notification));

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    dispatch(clearNotification());
    timeoutId = null;
  }, duration * 1000);
}

export default notificationSlice.reducer;
