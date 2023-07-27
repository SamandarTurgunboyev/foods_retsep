import { createSlice } from "@reduxjs/toolkit"

const categotySlice = createSlice({
    name: 'categoty',
    initialState: {
        isLoading: false,
        isSucces: false,
        category: [],
        isFailure: null
    },
    reducers: {
        catIsLoad: (state, action) => {
            state.isLoading = true
        },
        catIsSucc: (state, action) => {
            state.isLoading = false
            state.isSucces = true
            state.category = action.payload
            state.isFailure = null
        },
        catIsFail: (state, action) => {
            state.isLoading = false
            state.category = []
            state.isFailure = action.payload
            state.isSucces = false
        }
    }
})

export default categotySlice.reducer;
export const { catIsLoad, catIsSucc, catIsFail } = categotySlice.actions