import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invokeFunction: false,
  invokeGetGroupsFunction: false,
  selectedGroupId: 1
}

export const invokeFunctionSlice = createSlice({
    name: 'invokeFunction',
    initialState,
    reducers: {
      setInvokeFunction: (state, action) => {
            state.invokeFunction = action.payload
      },
      setInvokeGetGroupsFunction: (state, action) => {
        state.invokeGetGroupsFunction = action.payload
      },
      setSelectedGroupId: (state, action) => {
        state.selectedGroupId = action.payload
      }
    }
})

export const { setInvokeFunction, setInvokeGetGroupsFunction, setSelectedGroupId } = invokeFunctionSlice.actions
export const selectInvokeFunction = (state: any) => state.invokeFunction.invokeFunction
export const selectInvokeGetGroupsFunction = (state: any) => state.invokeFunction.invokeGetGroupsFunction
export const selectSelectedGroupId = (state: any) => state.invokeFunction.selectedGroupId

export default invokeFunctionSlice.reducer;