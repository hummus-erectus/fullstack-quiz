import { createSlice } from '@reduxjs/toolkit'

const notficationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, type: null },
  reducers: {
    newNotification(state, action) {
      return { message: action.payload.message, type: action.payload.type }
    },
    removeNotification() {
      return { message: null, type: null }
    }
  }
})

export const { newNotification, removeNotification } = notficationSlice.actions

export const setNotification = (message, type, timeout) => {
  console.log('message', message)
  console.log('type', type)
  console.log('timeout', timeout)
  return dispatch => {
    dispatch(newNotification({ message, type }))
    setTimeout(() => dispatch(removeNotification()), timeout*1000)
  }
}

export default notficationSlice.reducer