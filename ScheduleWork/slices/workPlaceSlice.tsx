import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workPlace: {}
}

export const workPlaceSlice = createSlice({
    name: 'workPlace',
    initialState,
    reducers: {
        setWorkPlace: (state, action) => {
            state.workPlace = action.payload
        }
    }
})

export const { setWorkPlace } = workPlaceSlice.actions
export const selectWorkPlace = (state: any) => state.workPlace.workPlace

export default workPlaceSlice.reducer;