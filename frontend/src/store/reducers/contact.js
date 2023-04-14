import { createSlice } from "@reduxjs/toolkit";
import { saveContactMessage } from "../../utils/thunks";

export const userContactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    user_message: null,
  },
  reducers: {
    SetEmptyContactMessage(state) {
      state.loading = false;
      state.user = null;
      state.user_message = null;
      state.contact_date = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveContactMessage.pending, (state) => {
        state.loading = true;
        state.user_message = null;
      })
      .addCase(saveContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.user_message = action.payload.user_message;
      })
      .addCase(saveContactMessage.rejected, (state) => {
        state.loading = false;
        state.user_message = null;
      });
  },
});

export const { SetEmptyContactMessage } = userContactSlice.actions;
export default userContactSlice.reducer;
