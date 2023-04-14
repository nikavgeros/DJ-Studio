import React from "react";
import { useDispatch } from "react-redux";
import { SignOut } from "../store/reducers/users";
import Home from "./Home";

const Logout = () => {
  const dispatch = useDispatch();

  dispatch(SignOut());

  return (
    <>
      <Home />
    </>
  );
};

export default Logout;
