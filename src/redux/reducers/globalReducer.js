import { createSlice } from '@reduxjs/toolkit'
const globalSlice = createSlice({
  name: 'enquiry',
  initialState: {},
  reducers: {
    fetch_cities_success(state, action) {
      const { cities } = action.payload
      return {
        ...state,
        cities
      }
    },
    
  }
})
export const { 
  fetch_cities_success,
} = globalSlice.actions

export default globalSlice.reducer