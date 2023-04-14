import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setVideoIds, setVideoIdStatus } from "../store/reducers/videos";

const URL_SERV = "http://127.0.0.1:7000";

// ============================================================= Users Reducer =============================================================
export const SignUp = createAsyncThunk(
  "users/signup",
  async ({ user = {} }, { getState }) => {
    try {
      const prevState = getState().users;
      const response = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${URL_SERV}/auth/users/`,
        withCredentials: false,
        data: user,
      });
      return {
        user: response.data.email,
        hasRegistered: true,
        isAuthenticated: false,
        loginMessage: null,
        registerMessage: null,
        access: null,
        refresh: null,
      };
    } catch (error) {
      return {
        user: null,
        hasRegistered: false,
        isAuthenticated: false,
        loginMessage: null,
        registerMessage: Object.values(error.response.data)[0],
        access: null,
        refresh: null,
      };
    }
  }
);

export const SignIn = createAsyncThunk(
  "users/signin",
  async ({ user = {} }, { getState }) => {
    try {
      const prevState = getState().users;
      const response = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${URL_SERV}/auth/jwt/create/`,
        withCredentials: false,
        data: user,
      });
      return {
        user: user.email,
        hasRegistered: false,
        isAuthenticated: true,
        loginMessage: null,
        registerMessage: null,
        access: response.data.access,
        refresh: response.data.refresh,
      };
    } catch (error) {
      return {
        user: user.email,
        hasRegistered: false,
        isAuthenticated: false,
        loginMessage: error.response.data.detail,
        registerMessage: null,
        access: null,
        refresh: null,
      };
    }
  }
);

export const ResetPassword = createAsyncThunk(
  "users/ResetPassword",
  async ({ email }, { getState }) => {
    try {
      const prevState = getState().users;
      const response = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${URL_SERV}/auth/users/reset_password/`,
        withCredentials: false,
        data: JSON.stringify({ email: email }),
      });
      return {
        user: email,
        hasRegistered: false,
        isAuthenticated: false,
        loginMessage: null,
        registerMessage: null,
        access: null,
        refresh: null,
      };
    } catch (error) {
      return {
        user: email,
        hasRegistered: false,
        isAuthenticated: false,
        loginMessage: error.response.data.detail,
        registerMessage: null,
        access: null,
        refresh: null,
      };
    }
  }
);

export const ResetPasswordConfirm = createAsyncThunk(
  "users/ResetPasswordConfirm",
  async ({ user = {} }, { getState }) => {
    try {
      const prevState = getState().users;
      const response = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${URL_SERV}/auth/jwt/create/`,
        withCredentials: false,
        data: user,
      });
      return {
        user: user.email,
        hasRegistered: false,
        isAuthenticated: true,
        loginMessage: null,
        registerMessage: null,
        access: response.data.access,
        refresh: response.data.refresh,
      };
    } catch (error) {
      return {
        user: user.email,
        hasRegistered: false,
        isAuthenticated: false,
        loginMessage: error.response.data.detail,
        registerMessage: null,
        access: null,
        refresh: null,
      };
    }
  }
);

// ============================================================= Videos Reducer =============================================================
export const fetchVideosFromYT = createAsyncThunk(
  "videos/fetchVideosFromYT",
  async (query, { getState }) => {
    try {
      const prevState = getState().videos;
      const response = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${URL_SERV}/videos/`,
        withCredentials: false,
        data: JSON.stringify({
          query: query,
        }),
      });
      console.log(`fetchVideosFromYT: ${query}`);
      console.log(`fetchVideosFromYT: ${response.data}`);
      return response.data;
    } catch (error) {
      console.log(
        "Error",
        error.response.status,
        ": ",
        error.response.data.detail
      );
      return error.response.data.detail;
    }
  }
);

export const downloadVideo = createAsyncThunk(
  "videos/downloadVideo",
  async (video_id, { getState }) => {
    try {
      const prevState = getState().videos;
      const response = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${URL_SERV}/download-video/`,
        withCredentials: false,
        data: JSON.stringify({
          video_id: video_id,
        }),
      });
      console.log(`Response downloadVideo: ${response.data} ${video_id}`);
      return { status: response.data, video_id: video_id };
    } catch (error) {
      console.log(
        "Error",
        error.response.status,
        ": ",
        error.response.data.detail
      );
      return error.response.data.detail;
    }
  }
);

export const downloadMp3 = createAsyncThunk(
  "videos/downloadMp3",
  async (video_id, { getState }) => {
    try {
      const prevState = getState().videos;
      const response = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${URL_SERV}/download-mp3/`,
        withCredentials: false,
        data: JSON.stringify({
          video_id: video_id,
        }),
      });
      console.log(`Response downloadMp3: ${response.data} ${video_id}`);
      return { status: response.data, video_id: video_id };
    } catch (error) {
      console.log(
        "Error",
        error.response.status,
        ": ",
        error.response.data.detail
      );
      return error.response.data.detail;
    }
  }
);

export const downloadFromFile = createAsyncThunk(
  "videos/downloadFromFile",
  async (file, { getState }) => {
    try {
      const response = await axios({
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        url: `${URL_SERV}/download-from-file/`,
        withCredentials: false,
        data: JSON.stringify({
          file: file,
        }),
      });
      console.log(`uploadFile: ${response.data}`);
      return response.data;
    } catch (error) {
      console.log(
        "Error",
        error.response.status,
        ": ",
        error.response.data.detail
      );
      return error.response.data.detail;
    }
  }
);

// ============================================================= Playlist Reducer =============================================================
export const fetchPlaylist = createAsyncThunk(
  "playlist/fetchPlaylist",
  async (user_email, { getState }) => {
    try {
      const prevState = getState().playlist;
      const response = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${URL_SERV}/playlist/`,
        withCredentials: false,
        data: JSON.stringify({
          user_email: user_email,
        }),
      });
      return response.data;
    } catch (error) {
      console.log(
        "Error",
        error.response.status,
        ": ",
        error.response.data.detail
      );
      return error.response.data.detail;
    }
  }
);

export const addToPlaylist = createAsyncThunk(
  "playlist/addToPlaylist",
  async (video, { getState }) => {
    try {
      const prevState = getState().videos;
      const response = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${URL_SERV}/add-to-playlist/`,
        withCredentials: false,
        data: JSON.stringify({
          video: video,
        }),
      });
      console.log(`addToPlaylist: ${response.data}`);
      return response.data;
    } catch (error) {
      console.log(
        "Error",
        error.response.status,
        ": ",
        error.response.data.detail
      );
      return error.response.data.detail;
    }
  }
);

export const deleteFromPlaylist = createAsyncThunk(
  "playlist/deleteFromPlaylist",
  async (video, { getState }) => {
    try {
      const prevState = getState().playlist;
      const response = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${URL_SERV}/delete-from-playlist/`,
        withCredentials: false,
        data: JSON.stringify({
          video: video,
        }),
      });
      console.log(`deleteFromPlaylist: ${response.data}`);
      return response.data;
    } catch (error) {
      console.log(
        "Error",
        error.response.status,
        ": ",
        error.response.data.detail
      );
      return error.response.data.detail;
    }
  }
);

// ============================================================= Contact =============================================================

export const saveContactMessage = createAsyncThunk(
  "contact/saveContactMessage",
  async ({ contact_email, user_message }, { getState }) => {
    try {
      const prevState = getState().contact;
      const response = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${URL_SERV}/contact/`,
        withCredentials: false,
        data: JSON.stringify({
          contact_email: contact_email,
          user_message: user_message,
          contact_date: Date.now(),
        }),
      });
      console.log(`saveContactMessage: ${response.data}`);
      return { status: response.data, user_message: user_message };
    } catch (error) {
      console.log(
        "Error",
        error.response.status,
        ": ",
        error.response.data.detail
      );
      return error.response.data.detail;
    }
  }
);
