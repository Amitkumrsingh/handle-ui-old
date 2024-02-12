import { createSlice } from '@reduxjs/toolkit'
const toasterSlice = createSlice({
  name: 'toaster',
  initialState: {},
  reducers: {
    fetch_success(state, action) {
      const { successMessage } = action.payload
      return {
        ...state,
        successMessage,
        failureMessage: null
      }
    },
    fetch_error(state, action) {
      const  { failureMessage } = action.payload
      return {
        ...state,
        failureMessage,
        successMessage: null
      }
    },
    close_toaster_message(state, action) { 
      return {
        successMessage: null,
        failureMessage: null
      }
    }
  }
})
export const {
  fetch_success,
  fetch_error,
  close_toaster_message
} = toasterSlice.actions

export default toasterSlice.reducer