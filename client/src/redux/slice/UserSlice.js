import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
  user: {},
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
    addWatchLater: (state, action) => {
      state.user.watchLater.unshift(action.payload);
    },
    removeWatchLater: (state, action) => {
      state.user.watchLater = state.user.watchLater.filter(
        (item) => item.name !== action.payload.name && item.id !== action.payload.id
      );
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
