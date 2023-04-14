import { configureStore } from "@reduxjs/toolkit";
import VideoReducer from "./reducers/videos";
import UsersReducer from "./reducers/users";
import PlaylistReducer from "./reducers/playlist";
import UserContactReducer from "./reducers/contact";

export const store = configureStore({
  reducer: {
    videos: VideoReducer,
    users: UsersReducer,
    playlist: PlaylistReducer,
    contact: UserContactReducer,
  },
});
