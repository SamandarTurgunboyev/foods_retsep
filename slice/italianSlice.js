import { createSlice } from "@reduxjs/toolkit"

const italianSlice = createSlice({
    name: 'italian',
    initialState: {
        isLoading: false,
        isSucces: false,
        italian: [],
        isFailure: null
    },
    reducers: {
        itaIsLoad: (state, action) => {
            state.isLoading = true
        },
        itaIsSucc: (state, action) => {
            state.isLoading = false
            state.isSucces = true
            state.italian = action.payload
            state.isFailure = null
        },
        itaIsFail: (state, action) => {
            state.isLoading = false
            state.italian = []
            state.isFailure = action.payload
            state.isSucces = false
        }
    }
})

export default italianSlice.reducer;
export const { itaIsFail, itaIsLoad, itaIsSucc } = italianSlice.actions