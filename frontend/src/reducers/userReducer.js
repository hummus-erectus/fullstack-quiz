import { createSlice } from '@reduxjs/toolkit'
import tokenService from '../services/tokenService'

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
    tokenService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const userLogout = () => {
  return dispatch => {
    tokenService.removeToken()
    dispatch(removeUser())
  }
}

export default userSlice.reducer