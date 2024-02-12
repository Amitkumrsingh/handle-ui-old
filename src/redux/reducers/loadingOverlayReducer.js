import { createSlice } from '@reduxjs/toolkit';
const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        ongoingRequests: false
    },
    reducers: {
        show_loading_overlay(state, action) {
            return {
                ...state,
                ongoingRequests: true
            }
        },
        hide_loading_overlay(state, action) {
            return {
                ...state,
                ongoingRequests: false
            }
        },
        reset_loading_overlay(state, action) {
            return {
                ...state,
                ongoingRequests: false
            }
        },
    }
})
export const {
    show_loading_overlay,
    hide_loading_overlay,
    reset_loading_overlay
} = loadingSlice.actions

export default loadingSlice.reducer