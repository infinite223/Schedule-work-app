import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invokeFunction: false
}

export const invokeFunctionSlice = createSlice({
    name: 'invokeFunction',
    initialState,
    reducers: {
      setInvokeFunction: (state, action) => {
            state.invokeFunction = action.payload
        }
    }
})

export const { setInvokeFunction } = invokeFunctionSlice.actions
export const selectInvokeFunction = (state: any) => state.invokeFunction.invokeFunction

export default invokeFunctionSlice.reducer;