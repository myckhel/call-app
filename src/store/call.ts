import { createSlice } from "@reduxjs/toolkit";
import { CallState } from "../interfaces";

const INIT_STATE: CallState = {
  otherUserId: undefined,
};

const { actions, reducer } = createSlice({
  name: "call",
  initialState: INIT_STATE,
  reducers: {
    setOtherUserId: (state, { payload }) => {
      state.otherUserId = payload;
    },
  },
});

export const { setOtherUserId } = actions;

export default reducer;
