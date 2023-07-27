import { createSlice } from "@reduxjs/toolkit"

const meelsSlice = createSlice({
    name: 'meels',
    initialState: {
        isLoading: false,
        isSucces: false,
        meels: [],
        isFailure: null
    },
    reducers: {
        meelIsLoad: (state, action) => {
            state.isLoading = true
        },
        meelIsSucc: (state, action) => {
            state.isLoading = false
            state.isSucces = true
            state.meels = action.payload
            state.isFailure = null
        },
        meelIsFail: (state, action) => {
            state.isLoading = false
            state.meels = []
            state.isFailure = action.payload
            state.isSucces = false
        }
    }
})

export default meelsSlice.reducer;
export const { meelIsLoad, meelIsSucc, meelIsFail } = meelsSlice.actions