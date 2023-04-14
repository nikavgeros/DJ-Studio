import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { saveContactMessage } from "../utils/thunks";

const layout = {
  width: "50%",
};

const validateMessages = {
  required: "The field is required",
  types: {
    email: "Not a valid email",
  },
};

const Contact = () => {
  const userState = useSelector((state) => state.users);
  const contactState = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const [formData, setFormdata] = useState({});
  const [showAlert, setAlert] = useState(false);
  const { TextArea } = Input;
  const { message } = formData;

  const onFinish = (values) => {
    if (values.message.trim() !== "") {
      setAlert(true);
      dispatch(
        saveContactMessage({
          contact_email: values.email,
          user_message: values.message,
        })
      );
    }
  };

  return (
    <>
      <div className="container text-center">
        {showAlert ? (
          <Alert
            message="Thank you for contact us! We will respond as soon as possible"
            type="success"
            closable
          />
        ) : null}
      </div>
      <div className="container text-center mt-5">
        <h1>Contact me</h1>
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
            <Input placeholder="Enter your email" name="email" style={layout} />
          </Form.Item>
          <Form.Item
            name={["message"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              placeholder="Enter your message"
              name="message"
              style={layout}
              value={message}
              rows={15}
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

export default Contact;
