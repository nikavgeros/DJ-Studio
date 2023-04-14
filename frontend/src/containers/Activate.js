import React, { useState } from "react";
import axios from "axios";
import { Alert } from "antd";
import { useParams } from "react-router-dom";
import Login from "./Login";

const BASE_URL = "http://127.0.0.1:7000";

const Activate = () => {
  const params = useParams();
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState();

  const verify = () => {
    try {
      const response = axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${BASE_URL}/auth/users/activation/`,
        withCredentials: false,
        data: { uid: params.uid, token: params.token },
      });
      return { isVerified: true, message: "Verified!" };
    } catch (error) {
      return { isVerified: false, message: error.response.data.detail };
    }
  };

  const handleVerification = (e) => {
    const response = verify();
    setVerified(response.isVerified);
    setMessage(response.message);
  };

  if (verified) {
    return (
      <>
        {" "}
        <div className="container text-center">
          <Alert
            message={message}
            type="success"
            showIcon
            closable
            description=""
          />
        </div>
        <Login />
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ marginTop: "200px" }}
        >
          <h1>Verify your Account:</h1>
          <button
            onClick={handleVerification}
            style={{ marginTop: "50px" }}
            type="button"
            className="btn btn-primary"
          >
            Verify
          </button>
        </div>
      </div>
    </>
  );
};

export default Activate;
