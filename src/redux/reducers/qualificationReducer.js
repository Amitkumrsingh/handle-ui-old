import { createSlice } from '@reduxjs/toolkit';
const qualificationSlice = createSlice({
  name: 'qualification',
  initialState: {},
  reducers: {
    fetch_qualifications_success(state, action) {
      const { qualifications } = action.payload;
      return {
        ...state,
        qualifications
      }
    },
    delete_qualification_success(state, action) {
      let { qualificationId } = action.payload
      return {
        ...state,
        qualifications: state.qualifications.filter(qualification => {
          return qualification.id !== qualificationId
        })
      }
    },
    create_qualification_success(state, action) {
      let { qualification } = action.payload;
      return {
        ...state,
        qualifications: [...state.qualifications, qualification]
      }
    },
    update_qualification_success(state, action) {
        let { qualification } = action.payload;
        return {
          ...state,
          qualifications: state.qualifications.map(data => {
            if(data.id === qualification.id){
               return qualification
            }
            return data
          })
        }
      }
  }
})
export const {
  fetch_qualifications_success,
  delete_qualification_success,
  create_qualification_success,
  update_qualification_success
} = qualificationSlice.actions

export default qualificationSlice.reducer