import { configureStore } from "@reduxjs/toolkit";
import groupsSlice from "./slices/groupsSlice";
import workPlaceSlice from "./slices/workPlaceSlice";
import invokeFunctionSlice from "./slices/invokeFunction";

export const store = configureStore({
  reducer: {
    groups: groupsSlice,
    workPlace: workPlaceSlice,
    invokeFunction: invokeFunctionSlice,
  },
});
