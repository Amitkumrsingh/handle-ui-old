import { createSlice } from '@reduxjs/toolkit';
const platformSlice = createSlice({
  name: 'platform',
  initialState: {},
  reducers: {
    fetch_platforms_success(state, action) {
      const { platforms } = action.payload;
      return {
        ...state,
        platforms
      }
    },
    delete_platform_success(state, action) {
      let { platformId } = action.payload;
      return {
        ...state,
        platforms: state.platforms.filter(platform => {
          return platform.id !== platformId
        })
      }
    },
    create_platform_success(state, action) {
      let { platform } = action.payload;
      return {
        ...state,
        platforms: [...state.platforms, platform]
      }
    },
    update_platform_success(state, action) {
        let { platform } = action.payload;
        return {
          ...state,
          platforms: state.platforms.map(data => {
            if(data.id === platform.id){
               return platform
            }
            return data
          })
        }
      }
  }
})
export const {
  fetch_platforms_success,
  delete_platform_success,
  create_platform_success,
  update_platform_success
} = platformSlice.actions

export default platformSlice.reducer