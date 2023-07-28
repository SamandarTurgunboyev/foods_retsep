import { createSlice } from '@reduxjs/toolkit'

const addSlice = createSlice({
    name: 'favourite',
    initialState: {
        favourite: [],
        error: null
    },
    reducers: {
        addFav: (state, action) => {
            state.favourite = action.payload
        },
        addError: (state, action) => {
            state.error = action.payload
        }
    }
})

export default addSlice.reducer;
export const { addCount, addFav, addError } = addSlice.actions