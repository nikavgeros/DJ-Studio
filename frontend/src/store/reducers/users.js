import { createSlice } from "@reduxjs/toolkit";
import { SignUp, SignIn, ResetPassword } from "../../utils/thunks";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    isPremium: false,
    hasRegistered: false,
    isAuthenticated: false,
    loginMessage: null,
    registerMessage: null,
    access: null,
    refresh: null,
  },
  reducers: {
    SignOut(state) {
      state.user = null;
      state.isPremium = false;
      state.hasRegistered = false;
      state.isAuthenticated = false;
      state.loginMessage = null;
      state.registerMessage = null;
      state.access = null;
      state.refresh = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignUp.pending, (state, action) => {
      state.user = null;
      state.isPremium = false;
      state.hasRegistered = false;
      state.isAuthenticated = false;
      state.loginMessage = null;
      state.registerMessage = null;
      state.access = null;
      state.refresh = null;
    });
    builder.addCase(SignUp.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isPremium = false;
      state.hasRegistered = action.payload.hasRegistered;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.loginMessage = action.payload.loginMessage;
      state.registerMessage = action.payload.registerMessage;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    });
    builder.addCase(SignUp.rejected, (state, action) => {
      state.user = null;
      state.isPremium = false;
      state.hasRegistered = false;
      state.isAuthenticated = false;
      state.loginMessage = action.payload.loginMessage;
      state.registerMessage = action.payload.registerMessage;
      state.access = null;
      state.refresh = null;
    });
    builder.addCase(SignIn.pending, (state, action) => {
      state.user = null;
      state.isPremium = false;
      state.hasRegistered = false;
      state.isAuthenticated = false;
      state.loginMessage = null;
      state.registerMessage = null;
      state.access = null;
      state.refresh = null;
    });
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isPremium = false;
      state.hasRegistered = action.payload.hasRegistered;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.loginMessage = action.payload.loginMessage;
      state.registerMessage = action.payload.registerMessage;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    });
    builder.addCase(SignIn.rejected, (state, action) => {
      state.user = null;
      state.isPremium = false;
      state.hasRegistered = false;
      state.isAuthenticated = false;
      state.loginMessage = action.payload.loginMessage;
      state.registerMessage = action.payload.registerMessage;
      state.access = null;
      state.refresh = null;
    });
    builder.addCase(ResetPassword.pending, (state, action) => {
      state.user = null;
      state.isPremium = false;
      state.hasRegistered = false;
      state.isAuthenticated = false;
      state.loginMessage = null;
      state.registerMessage = null;
      state.access = null;
      state.refresh = null;
    });
    builder.addCase(ResetPassword.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isPremium = false;
      state.hasRegistered = action.payload.hasRegistered;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.loginMessage = action.payload.loginMessage;
      state.registerMessage = action.payload.registerMessage;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    });
    builder.addCase(ResetPassword.rejected, (state, action) => {
      state.user = null;
      state.isPremium = false;
      state.hasRegistered = false;
      state.isAuthenticated = false;
      state.loginMessage = action.payload.loginMessage;
      state.registerMessage = action.payload.registerMessage;
      state.access = null;
      state.refresh = null;
    });
  },
});

export const { SignOut } = usersSlice.actions;
export default usersSlice.reducer;
