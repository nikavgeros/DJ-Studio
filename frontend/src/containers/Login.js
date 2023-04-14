import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { Link } from "react-router-dom";
import { SignIn, fetchPlaylist } from "../utils/thunks";
import { useSelector, useDispatch } from "react-redux";
import Home from "./Home";

const layout = {
  width: "30%",
};

const validateMessages = {
  required: "The field is required",
  types: {
    email: "Not a valid email",
  },
};

const Login = () => {
  const [formData, setFormdata] = useState({});
  const [showAlert, setAlert] = useState(false);
  const userState = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const { email, password } = formData;

  const onFinish = (values) => {
    dispatch(SignIn({ user: values }));
    setAlert(true);
  };

  if (userState.isAuthenticated) {
    dispatch(fetchPlaylist(userState.user));
    return <Home />;
  }

  return (
    <>
      {userState.loginMessage ? (
        <div className="container text-center">
          <Alert
            message={userState.loginMessage}
            type="error"
            showIcon
            closable
            description=""
          />
        </div>
      ) : null}
      <div className="container text-center mt-5">
        <h1>Login</h1>
        <p>Sign into your Account</p>
        <Form
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["email"]}
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              name="email"
              style={layout}
              value={email}
            />
          </Form.Item>
          <Form.Item
            name={["password"]}
            rules={[
              {
                type: password,
                required: true,
                min: 6,
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              name="password"
              autocomplete="on"
              style={layout}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p className="mt-3">
          New to Dj-Studio? <Link to="/register">Sign Up</Link>
        </p>
        <p className="mt-3">
          Forgot your Password? <Link to="/reset-password">Reset Password</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
