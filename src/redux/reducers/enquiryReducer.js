import { createSlice } from '@reduxjs/toolkit'
const enquirySlice = createSlice({
  name: 'enquiry',
  initialState: {},
  reducers: {
    fetch_enquiries_success(state, action) {
      const { enquiries } = action.payload
      return {
        ...state,
        enquiries
      }
    },
    delete_enquiry_success(state, action) {
      let {enquiryId} = action.payload
      return {
        ...state,
        enquiries: state.enquiries.filter( enquiry => {
          return enquiry.id !== enquiryId
        })
      }
    },
    create_enquiry_success(state, action) {
      let { enquiry } = action.payload;
      return {
        ...state,
        enquiries: [...state.enquiries, enquiry]
      }
    },
    update_enquiry_success(state, action) {
      let { enquiry } = action.payload;
      return {
        ...state,
        enquiries: state.enquiries.map(data => {
          if(data.id === enquiry.id){
             return enquiry
          }
          return data
        })
      }
    }
  }
})
export const { 
  fetch_enquiries_success, 
  delete_enquiry_success,
  create_enquiry_success,
  update_enquiry_success
} = enquirySlice.actions

export default enquirySlice.reducer