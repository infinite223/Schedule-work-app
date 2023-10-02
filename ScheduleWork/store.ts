import { configureStore } from "@reduxjs/toolkit";
import groupsSlice from './slices/groupsSlice'
import workPlaceSlice from "./slices/workPlaceSlice";

export const store = configureStore({
    reducer: {
        groups:groupsSlice,
        workPlace:workPlaceSlice,
    }
})