import { createSlice } from "@reduxjs/toolkit"

const foodSlice = createSlice({
    name: 'foods',
    initialState: {
        isLaoding: false,
        isSucces: false,
        isFailur: null,
        foods: [],
    },
    reducers: {
        foodsLoad: (state, action) => {
            state.isLaoding = true
        },
        foodsSucc: (state, action) => {
            state.isLaoding = false
            state.foods = action.payload
        },
        foodsFail: (state, action) => {
            state.isLaoding = false,
                state.isSucces = false,
                state.isFailur = action.payload
        },
    }
})

export default foodSlice.reducer;
export const { foodsSucc, foodsLoad, foodsFail } = foodSlice.actions