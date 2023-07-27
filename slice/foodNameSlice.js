import { createSlice } from "@reduxjs/toolkit"

const foodNameSlice = createSlice({
    name: 'foods',
    initialState: {
        isLaoding: false,
        isSucces: false,
        isFailur: null,
        foodName: [],
    },
    reducers: {
        foodNameLoad: (state, action) => {
            state.isLaoding = true
        },
        foodNameSucc: (state, action) => {
            state.isLaoding = false
            state.foodName = action.payload
        },
        foodNameFail: (state, action) => {
            state.isLaoding = false,
                state.isSucces = false,
                state.isFailur = action.payload
        },
    }
})

export default foodNameSlice.reducer;
export const { foodNameSucc, foodNameLoad, foodNameFail } = foodNameSlice.actions