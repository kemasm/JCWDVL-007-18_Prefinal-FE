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

const LoginContent = function (props) {
  // password visibility toggling
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [isWaiting, setIsWaiting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const { setUser } = useContext(Context);

  const history = useHistory();

  // prevent authenticated user to enter this page
  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem("auth"));
    if (authenticatedUser) {
      history.push("/");
    }
  }, [history]);

  const getInputs = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    return { email, password };
  };

  const isInputFormatValid = (email, password) => {
    if (!email || !password) {
      setErrorMsg("email and password must be filled");
      return false;
    } else if (!validator.isEmail(email)) {
      setErrorMsg("email format is invalid");
      return false;
    }
    return true;
  };

  const _login = async (email, password) => {
    const url = "http://localhost:8001/login";
    try {
      return await axios.post(url, { email, password });
    } catch (error) {
      return error;
    }
  };

  const login = async () => {
    const { email, password } = getInputs();
    const isValid = isInputFormatValid(email, password);

    if (isValid) {
      setIsWaiting(true);
      const response = await _login(email, password);
      if (response.status === 200) {
        localStorage.setItem("auth", JSON.stringify(response.data));
        setUser(response.data);
        setIsWaiting(false);
        history.push("/");
      } else if (response.response) {
        setErrorMsg(response.response.data.message);
        setIsWaiting(false);
      } else {
        setErrorMsg("Internal server error");
        setIsWaiting(false);
      }
    }
  };

  return (
    <div className="w-100 h-100">
      <p
        className="py-3 px-4 m-0 d-none d-lg-block"
        style={{ textAlign: "right" }}
      >
        Not a member yet? <a href="/register">Sign Up Now</a>
      </p>

      <div
        className="container d-flex flex-column align-items-center"
        style={{ marginTop: "20vh" }}
      >
        <div>
          <h5 className="mb-4 mx-3 d-lg-none">JUGGGLE</h5>

          <h3 className="mb-4 mx-3 ">
            <strong>Sign In to Jugggle</strong>
          </h3>

          <div className="mx-3 my-3">
            <small className="text-danger">{errorMsg}</small>
          </div>

          <Form style={{ width: "100vw", maxWidth: "450px" }}>
            <FormGroup floating className="mx-3">
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
                innerRef={emailRef}
              />
              <Label for="exampleEmail">Email</Label>
            </FormGroup>

            <FormGroup className="position-relative mx-3" floating>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type={passwordShown ? "text" : "password"}
                innerRef={passwordRef}
              />
              <Button
                outline
                color="link"
                className={`${styles.password_toggler} position-absolute bg-white border-0`}
                onClick={togglePassword}
              >
                <FontAwesomeIcon
                  icon={passwordShown ? faEyeSlash : faEye}
                ></FontAwesomeIcon>
              </Button>
              <Label for="examplePassword">Password</Label>
            </FormGroup>

            <div className="d-flex justify-content-between align-items-center mx-3">
              <Button
                className="btn-danger"
                onClick={login}
                disabled={isWaiting}
              >
                Sign In
              </Button>
              <a href="#">Forgot Password?</a>
            </div>
          </Form>

          <p className="mt-3 mx-3 d-lg-none" style={{ textAlign: "left" }}>
            Not a member yet? <a href="/register">Sign Up Now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
