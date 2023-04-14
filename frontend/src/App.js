import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./hocs/Layout";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Logout from "./containers/Logout";
import Register from "./containers/Register";
import Activate from "./containers/Activate";
import ResetPasswordForm from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import { store } from "./store/index";
import Contact from "./containers/Contact";
import About from "./containers/About";
import DJFile from "./containers/DJFile";
import DJPlayList from "./containers/DJPlaylist";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dj-playlist" element={<DJPlayList />} />
            <Route path="/dj-file" element={<DJFile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPasswordConfirm />}
            />
            <Route path="/activate/:uid/:token" element={<Activate />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
