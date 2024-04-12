import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces";
// import api from "../../api";

const INIT_STATE: AuthState = {
  user: undefined,
};

const { actions, reducer } = createSlice({
  name: "auth",
  initialState: INIT_STATE,
  reducers: {
    // setToken: (state, { payload: token }) => {
    //   api.defaults.headers["Accept"] = "application/json";
    //   api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // },

    logoutUser: (state) => {
      state.user = undefined;
    },

    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setUser, logoutUser /*setToken,*/ } = actions;

export default reducer;
