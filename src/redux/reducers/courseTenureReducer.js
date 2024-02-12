import { createSlice } from '@reduxjs/toolkit';
const courseTenureSlice = createSlice({
  name: 'courseTenure',
  initialState: {},
  reducers: {
    fetch_courseTenures_success(state, action) {
      const { courseTenures } = action.payload;
      return {
        ...state,
        courseTenures
      }
    },
    delete_courseTenure_success(state, action) {
      let { courseTenureId } = action.payload
      return {
        ...state,
        courseTenures: state.courseTenures.filter(tenure => {
          return tenure.id !== courseTenureId
        })
      }
    },
    create_courseTenure_success(state, action) {
      let { courseTenure } = action.payload;
      return {
        ...state,
        courseTenures: [...state.courseTenures, courseTenure]
      }
    },
    update_courseTenure_success(state, action) {
        let { courseTenure } = action.payload;
        return {
          ...state,
          courseTenures: state.courseTenures.map(data => {
            if(data.id === courseTenure.id){
               return courseTenure
            }
            return data
          })
        }
      }
  }
})
export const {
  fetch_courseTenures_success,
  delete_courseTenure_success,
  create_courseTenure_success,
  update_courseTenure_success
} = courseTenureSlice.actions

export default courseTenureSlice.reducer