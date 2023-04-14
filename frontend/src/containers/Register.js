import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { SignUp } from "../utils/thunks";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const layout = {
  width: "30%",
};

const validateMessages = {
  required: "The field is required",
  types: {
    email: "Not a valid email",
    password: "Password must be at least 8 characters",
    re_password: "Passwords did not match",
  },
};

const Register = () => {
  const userState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [formData, setFormdata] = useState({});
  const [showAlert, setAlert] = useState(false);

  const { email, first_name, last_name, password, re_password } = formData;

  const onFinish = (values) => {
    dispatch(SignUp({ user: values }));
  };

  return (
    <>
      {userState.registerMessage ? (
        <div className="container text-center">
          <Alert
            message={userState.registerMessage}
            type="error"
            showIcon
            closable
            description=""
          />
        </div>
      ) : null}
      {userState.hasRegistered ? (
        <div className="container text-center">
          <Alert
            message="Verify your email address"
            type="success"
            showIcon
            closable
            description="We're happy you signed up for Dj-Studio. To start exploring the Dj-Studio app please visit you email address and click on the verification link we sent you"
          />
        </div>
      ) : null}

      <div className="container text-center mt-5">
        <h1>Sign Up</h1>
        <p>Create your Account</p>
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
            name={["first_name"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="Enter your fistname"
              name="fist_name"
              style={layout}
              value={first_name}
            />
          </Form.Item>
          <Form.Item
            name={["last_name"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="Enter your lastname"
              name="last_name"
              style={layout}
              value={last_name}
            />
          </Form.Item>
          <Form.Item
            name={["password"]}
            rules={[
              {
                type: password,
                required: true,
                min: 8,
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              name="password"
              style={layout}
              value={password}
            />
          </Form.Item>
          <Form.Item
            name={["re_password"]}
            rules={[
              {
                type: password,
                required: true,
                min: 8,
              },
            ]}
          >
            <Input.Password
              placeholder="Confirm password"
              name="re_password"
              style={layout}
              value={re_password}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p className="mt-3">
          Known to Dj-Studio? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
