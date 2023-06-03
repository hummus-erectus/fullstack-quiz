import { createSlice } from '@reduxjs/toolkit'
import tokenService from '../services/tokenService'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload }
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

export const updateUser = (id) => {
  return async dispatch => {
    const user = await userService.getIndividual(id)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
