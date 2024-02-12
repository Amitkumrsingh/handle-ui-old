import { createSlice } from '@reduxjs/toolkit'
const feeSlice = createSlice({
  name: 'fee',
  initialState: {},
  reducers: {
    fetch_fees_success(state, action) {
      const { fees } = action.payload
      return {
        ...state,
        fees
      }
    }
  }
})
export const { fetch_fees_success } = feeSlice.actions

export default feeSlice.reducer