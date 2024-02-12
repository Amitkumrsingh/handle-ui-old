import { createSlice } from '@reduxjs/toolkit';
const infos = ["personal_info", "course_info", "additional_info", "address_info", "fees"];

const studentSlice = createSlice({
  name: 'student',
  initialState: {},
  reducers: {
    fetch_students_success(state, action) {
      const { students } = action.payload
      return {
        ...state,
        students
      }
    },
    dispatch_delte_student(state, action) {
      const { studentId } = action.payload
      return {
        ...state,
        students: state.students.filter(student => {
          return student.id !== studentId
        }),
      }
    },
    dispatch_create_student(state, action) {
      const { student } = action.payload;
      return {
        ...state,
        [infos[student.step]]: student
      }
    },
    dispatch_update_student(state, action) {
      const { data } = action.payload;
      return {
        ...state,
        [infos[data.step]]: data
      }
    },
    empty_all_infos(state, action) {
      return {
        ...state,
        personal_info: {},
        course_info: {},
        additional_info: {},
        address_info: {},
        fees: {}
      }
    },
  }
})
export const {
  fetch_students_success,
  dispatch_create_student,
  dispatch_delte_student,
  dispatch_update_student,
  empty_all_infos
} = studentSlice.actions

export default studentSlice.reducer;