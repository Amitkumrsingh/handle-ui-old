import { createSlice } from '@reduxjs/toolkit';
const courseSlice = createSlice({
  name: 'course',
  initialState: {},
  reducers: {
    fetch_courses_success(state, action) {
      const { courses } = action.payload;
      return {
        ...state,
        courses
      }
    },
    delete_course_success(state, action) {
      let { courseId } = action.payload
      return {
        ...state,
        courses: state.courses.filter(course => {
          return course.id !== courseId
        })
      }
    },
    create_course_success(state, action) {
      let { course } = action.payload;
      return {
        ...state,
        courses: [...state.courses, course]
      }
    },
    update_course_success(state, action) {
      let { course } = action.payload;
      return {
        ...state,
        courses: state.courses.map(data => {
          if(data.id === course.id){
             return course
          }
          return data
        })
      }
    }
  }
})
export const {
  fetch_courses_success,
  delete_course_success,
  create_course_success,
  update_course_success
} = courseSlice.actions

export default courseSlice.reducer