import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: '',
        complated: [],
        isLoading: false,
        isSuccess: false,
        error: null
    },
    reducers: {
        serachLoad: (state, action) => {
            state.isLoading = true
        },
        searchSucc: (state, action) => {
            state.isLoading = false
            state.isFailur = false
            state.isSuccess = true
            state.complated = action.payload
        },
        searchName: (state, action) => {
            state.search = action.payload
        },
    }
})

export default searchSlice.reducer
export const { serachLoad, searchSucc, searchName } = searchSlice.actions