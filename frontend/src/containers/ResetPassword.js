import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { ResetPassword } from "../utils/thunks";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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

const ResetPasswordForm = () => {
  const userState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [formData, setFormdata] = useState({});
  const [showAlert, setAlert] = useState(false);

  const { email, message } = formData;

  const onFinish = (email) => {
    dispatch(ResetPassword(email)).then(setAlert(true));
  };

  return (
    <>
      {showAlert ? (
        <div className="container text-center">
          <Alert
            message="Check your mailbox"
            type="success"
            showIcon
            closable
            description="Click on the link we have sent you to reset your password!"
          />
        </div>
      ) : null}
      <div className="container text-center mt-5">
        <h1>Reset Your Password</h1>
        <Form
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          className="mt-5"
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

export default ResetPasswordForm;
