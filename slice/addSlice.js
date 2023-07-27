import { createSlice } from '@reduxjs/toolkit'

const addSlice = createSlice({
    name: 'favourite',
    initialState: {
        count: 0,
    },
    reducers: {
        addCount: (state, action) => {
            state.count += 1
        }
    }
})

export default addSlice.reducer;
export const { addCount } = addSlice.actions