import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
  init: false,
};

const { actions, reducer } = createSlice({
  name: "app",
  initialState: INIT_STATE,
  reducers: {
    init: (state, { payload }) => {
      state.init = payload;
    },
  },
});

export const { init } = actions;

export default reducer;
