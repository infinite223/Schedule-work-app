import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
});

export const { setGroups } = groupsSlice.actions;
export const selectGroups = (state: any) => state.groups.groups;

export default groupsSlice.reducer;
