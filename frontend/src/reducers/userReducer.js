import { createSlice } from '@reduxjs/toolkit'
import quizService from '../services/quizzes'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return (action.payload)
    },
    removeUser() {
      return null
    }

  }
})

export const { setUser, removeUser } = userSlice.actions

export const userLogin = (user) => {
  return dispatch => {
    quizService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const userLogout = () => {
  return dispatch => {
    quizService.removeToken()
    dispatch(removeUser())
  }
}

export default userSlice.reducer