import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    login(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    logout(state, action) {
      return {
        
      }
    }
  }
})
export const { login, logout } = userSlice.actions

export default userSlice.reducer