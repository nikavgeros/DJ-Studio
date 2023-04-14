import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = (props) => {
  return (
    <>
      <Header />
      <Navbar />
      <div
        class="page-container content-wrap"
        style={{ fontFamily: "sans-serif" }}
      >
        {props.children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
