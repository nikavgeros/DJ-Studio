import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Typography } from "antd";
import { LogoutOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const [current, setCurrent] = useState("mail");
  const userState = useSelector((state) => state.users);

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
    },
    {
      label: userState.isAuthenticated ? (
        <Link to="/logout">Logout</Link>
      ) : (
        <Link to="/login">Login</Link>
      ),
      key: userState.isAuthenticated ? "login" : "logout",
    },
    {
      label: <Link to="/contact">Contact</Link>,
      key: "contact",
    },
    {
      label: <Link to="/about">About</Link>,
      key: "about",
    },
  ];

  if (userState.isAuthenticated) {
    items.push(
      {
        label: <Link to="/dj-playlist">Dj Playlist</Link>,
        key: "dj-playlist",
      },
      {
        label: <Link to="/dj-file">Dj File</Link>,
        key: "dj-file",
      }
    );
  }

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["mail"]}
        className="container mt-2"
        style={{ textDecoration: "none" }}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        {userState.isAuthenticated ? (
          <>
            <Menu.Item key="dj-playlist">
              <Link to="/dj-playlist">Dj Playlist</Link>
            </Menu.Item>
            <Menu.Item key="dj-file">
              <Link to="/dj-file">Dj File</Link>
            </Menu.Item>
          </>
        ) : null}
        <Menu.Item key="contact">
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="profile"
          style={{
            marginLeft: userState.isAuthenticated ? "65%" : "78%",
          }}
          icon={
            <UserOutlined
              style={{
                fontSize: "20px",
              }}
            />
          }
        >
          {userState.isAuthenticated ? (
            <>
              {" "}
              <Menu.Item
                key="logout"
                icon={
                  <LogoutOutlined
                    style={{
                      fontSize: "16px",
                      color: "#08c",
                    }}
                  />
                }
              >
                <Link
                  to="/logout"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Logout
                </Link>
              </Menu.Item>
            </>
          ) : (
            <>
              {" "}
              <Menu.Item
                key="login"
                icon={
                  <LoginOutlined
                    style={{
                      fontSize: "16px",
                      color: "#08c",
                    }}
                  />
                }
              >
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </Menu.Item>
            </>
          )}
        </Menu.SubMenu>
      </Menu>
    </>
  );
};

export default Navbar;
