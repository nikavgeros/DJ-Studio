import { createSlice } from "@reduxjs/toolkit";
import {
  fetchVideosFromYT,
  downloadMp3,
  downloadVideo,
} from "../../utils/thunks";

export const videosSlice = createSlice({
  name: "videos",
  initialState: {
    loading: false,
    videos: [],
    videoLoadingIcons: {},
  },
  reducers: {
    setLoadingIcon(state, videoId) {
      state.videoLoadingIcons[videoId.payload] = true;
    },
    setEmptyVideos(state) {
      state.loading = false;
      state.videos = [];
      state.videoLoadingIcons = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideosFromYT.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVideosFromYT.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
        let arr1 = ["youtube-", "video-", "mp3-"];
        for (var i = 0; i < arr1.length; i++) {
          for (var k = 0; k < state.videos.length; k++) {
            state.videoLoadingIcons[arr1[i] + state.videos[k].video_id] = false;
          }
        }
      })
      .addCase(fetchVideosFromYT.rejected, (state) => {
        state.loading = false;
      })
      .addCase(downloadVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(downloadVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videoLoadingIcons[`video-${action.payload.video_id}`] = false;
      })
      .addCase(downloadVideo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(downloadMp3.pending, (state) => {
        state.loading = true;
      })
      .addCase(downloadMp3.fulfilled, (state, action) => {
        state.loading = false;
        state.videoLoadingIcons[`mp3-${action.payload.video_id}`] = false;
      })
      .addCase(downloadMp3.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoadingIcon, setEmptyVideos } = videosSlice.actions;
export default videosSlice.reducer;
