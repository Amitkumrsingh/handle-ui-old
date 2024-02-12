import { createSlice } from '@reduxjs/toolkit';
const infos = ["personal_info", "course_info", "additional_info", "address_info", "fees"];

const studentDetailsSlice = createSlice({
  name: 'studentDetails',
  initialState: {},
  reducers: {
    dispatch_update_student(state, action) {
      const { data } = action.payload;
      return {
        ...state,
        personal_info: data
      }
    },
    dispatch_empty_Details(state, action) {
        return {
            personal_info : null
        }
      },
  }
})
export const {
  dispatch_update_student,
  dispatch_empty_Details
} = studentDetailsSlice.actions

export default studentDetailsSlice.reducer;