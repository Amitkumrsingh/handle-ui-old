import { createSlice } from '@reduxjs/toolkit'
const branchSlice = createSlice({
  name: 'branch',
  initialState: {},
  reducers: {
    branch_results(state, action) {
      const { branches } = action.payload
      return {
        ...state,
        branches
      }
    },
    select_branch(state, action) {
      const { branch } = action.payload
      return {
        ...state,
        selected_branch: branch
      }
    }
  }
})
export const { 
  branch_results, 
  select_branch
} = branchSlice.actions

export default branchSlice.reducer