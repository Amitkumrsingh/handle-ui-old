import { createSlice } from '@reduxjs/toolkit';
const casteSlice = createSlice({
  name: 'caste',
  initialState: {},
  reducers: {
    fetch_castes_success(state, action) {
      const { castes } = action.payload;
      return {
        ...state,
        castes
      }
    },
    delete_caste_success(state, action) {
      let { casteId } = action.payload
      return {
        ...state,
        castes: state.castes.filter(caste => {
          return caste.id !== casteId
        })
      }
    },
    create_caste_success(state, action) {
      let { caste } = action.payload;
      return {
        ...state,
        castes: [...state.castes, caste]
      }
    },
    update_caste_success(state, action) {
        let { caste } = action.payload;
        return {
          ...state,
          castes: state.castes.map(data => {
            if(data.id === caste.id){
               return caste
            }
            return data
          })
        }
      }
  }
})
export const {
  fetch_castes_success,
  delete_caste_success,
  create_caste_success,
  update_caste_success
} = casteSlice.actions

export default casteSlice.reducer