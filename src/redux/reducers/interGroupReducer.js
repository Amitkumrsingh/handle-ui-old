import { createSlice } from '@reduxjs/toolkit';
const interGroupSlice = createSlice({
  name: 'interGroup',
  initialState: {},
  reducers: {
    fetch_interGroups_success(state, action) {
      const { interGroups } = action.payload;
      return {
        ...state,
        interGroups
      }
    },
    delete_interGroup_success(state, action) {
      let { interGroupId } = action.payload
      return {
        ...state,
        interGroups: state.interGroups.filter(group => {
          return group.id !== interGroupId
        })
      }
    },
    create_interGroup_success(state, action) {
      let { interGroup } = action.payload;
      return {
        ...state,
        interGroups: [...state.interGroups, interGroup]
      }
    },
    update_interGroup_success(state, action) {
        let { interGroup } = action.payload;
        return {
          ...state,
          interGroups: state.interGroups.map(data => {
            if(data.id === interGroup.id){
               return interGroup
            }
            return data
          })
        }
      }
  }
})
export const {
  fetch_interGroups_success,
  delete_interGroup_success,
  create_interGroup_success,
  update_interGroup_success
} = interGroupSlice.actions

export default interGroupSlice.reducer