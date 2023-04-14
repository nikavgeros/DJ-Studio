import { createSlice } from "@reduxjs/toolkit";
import {
  deleteFromPlaylist,
  fetchPlaylist,
  addToPlaylist,
} from "../../utils/thunks";

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    loading: false,
    playlist_videos: [],
  },
  reducers: {
    SetEmptyPlaylist(state) {
      state.loading = false;
      state.playlist_videos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist_videos = action.payload;
      })
      .addCase(fetchPlaylist.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addToPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist_videos = action.payload;
      })
      .addCase(addToPlaylist.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteFromPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFromPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist_videos = action.payload;
      })
      .addCase(deleteFromPlaylist.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { SetEmptyPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
