import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, Alert } from "antd";
import { useParams } from "react-router-dom";
import Login from "./Login";

const ResetPasswordConfirm = () => {
  const BASE_URL = "http://127.0.0.1:7000";

  const params = useParams();
  const [isCreated, setCreated] = useState(false);
  const [message, setMessage] = useState();
  const [formData, setFormdata] = useState({});
  const { password, re_password } = formData;

  const layout = {
    width: "30%",
  };

  const validateMessages = {
    required: "The field is required",
    types: {
      email: "Invalid email",
      password: "Password must be at least 8 characters",
      re_password: "Passwords did not match",
    },
  };

  const resetConfirmation = ({ new_password, new_re_password }) => {
    try {
      const response = axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${BASE_URL}/users/reset_password_confirm/`,
        withCredentials: false,
        data: {
          uid: params.uid,
          token: params.token,
          new_password: new_password,
          new_re_password: new_re_password,
        },
      });
      return { isCreated: true, message: "Verified!" };
    } catch (error) {
      return { isCreated: false, message: error.response.data.detail };
    }
  };

  const onFinish = (values) => {
    console.log("uid", params.uid, "token", params.token, values);
    const response = resetConfirmation(
      values.new_password,
      values.new_re_password
    );
    setCreated(response.isCreated);
    setMessage(response.message);
  };

  if (isCreated) {
    return (
      <>
        <div className="container text-center mt-5">
          <Login />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container text-center mt-5">
        <h1>New Password</h1>
        <p>Fill and submit the form to create new password</p>
        <Form name="nest-messages" onFinish={onFinish}>
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
      </div>
    </>
  );
};

export default ResetPasswordConfirm;
