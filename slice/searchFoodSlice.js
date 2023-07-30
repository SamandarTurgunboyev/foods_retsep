import { createSlice } from "@reduxjs/toolkit";

const searchFoodSlice = createSlice({
    name: 'searchFood',
    initialState: {
        search: '',
        complated: [],
        isLoading: false,
        isSuccess: false,
        error: null
    },
    reducers: {
        searchFoodLoad: (state, action) => {
            state.isLoading = true
        },
        searchFoodSucc: (state, action) => {
            state.isLoading = false
            state.isFailur = false
            state.isSuccess = true
            state.complated = action.payload
        },
        searchFoodName: (state, action) => {
            state.search = action.payload
        },
    }
})

export default searchFoodSlice.reducer
export const { searchFoodLoad, searchFoodSucc, searchFoodName } = searchFoodSlice.actions