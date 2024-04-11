import { createSlice } from "@reduxjs/toolkit";
// import api from "../../api";

const INIT_STATE = {
  user: null,
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
      state.user = null;
    },

    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setUser, logoutUser /*setToken,*/ } = actions;

export default reducer;
