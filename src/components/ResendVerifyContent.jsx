import React from "react";
import { useEffect, useRef, useContext } from "react";

import { useHistory } from "react-router-dom";

import validator from "validator";
import axios from "axios";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import styles from "../assets/Auth.module.css";

import Context from "../context";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const ResendVerifyContent = function (props) {
  const [isWaiting, setIsWaiting] = React.useState(false);

  const history = useHistory();

  // prevent authenticated user to enter this page
  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem("auth"));
    if (!authenticatedUser) {
      history.push("/login");
    } else if (authenticatedUser.user_is_verified !== 0) {
      history.push("/");
    }
  }, [history]);

  const _resend = async (email) => {
    const url = "http://localhost:8001/users/resend_mail";
    try {
      return await axios.post(url, { email });
    } catch (error) {
      return error;
    }
  };

  const resend = async () => {
    setIsWaiting(true);

    const email = JSON.parse(localStorage.getItem("auth")).user_email;
    const response = await _resend(email);

    if (response.status === 200) {
      alert(`email was successfully sent! Please check your inbox.`);
    } else {
      alert("Internal server error");
    }

    await delay(5000);
    setIsWaiting(false);
  };

  return (
    <div className="w-100 h-100">
      <div
        className="container d-flex flex-column align-items-center"
        style={{ marginTop: "20vh" }}
      >
        <div>
          <h5 className="mb-4 mx-3 d-lg-none">JUGGGLE</h5>

          <h3 className="mb-4 mx-3 ">
            <strong>Verify your account</strong>
          </h3>

          <p className="mb-4 mx-3 ">
            We've sent verification link to your email, please check your inbox.
            <br />
            Click button bellow if you don't get any message from us.
          </p>

          <Form style={{ width: "100vw", maxWidth: "450px" }}>
            <div className="d-flex justify-content-between align-items-center mx-3">
              <Button
                disabled={isWaiting}
                className="btn-danger"
                onClick={resend}
              >
                Resend Email
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResendVerifyContent;
