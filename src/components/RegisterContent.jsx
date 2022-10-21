import React from "react";
import { useHistory } from "react-router-dom";

import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";

import Context from "../context";

const RegisterContent = function (props) {
  const fullnameRef = React.useRef(null);
  const usernameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const repeatPasswordRef = React.useRef(null);

  const [isWaiting, setIsWaiting] = React.useState(false);
  const [fullnameError, setFullnameError] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [repeatPasswordError, setRepeatPasswordError] = React.useState("");
  const [formError, setFormError] = React.useState("");

  const { setUser } = React.useContext(Context);

  const history = useHistory();

  // prevent authenticated user to enter this page
  React.useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem("auth"));
    if (authenticatedUser) {
      history.push("/");
    }
  }, [history]);

  const getInputs = () => {
    const fullname = fullnameRef.current.value;
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;
    return { fullname, username, email, password, repeatPassword };
  };

  const createFormData = ({
    userUuid,
    email,
    password,
    fullname,
    username,
  }) => {
    const formData = new FormData();
    formData.append("userUuid", userUuid);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fullname", fullname);
    formData.append("username", username);
    return formData;
  };

  const isInputFormatValid = (
    fullname,
    username,
    email,
    password,
    repeatPassword
  ) => {
    setEmailError("");
    setFullnameError("");
    setUsernameError("");
    setPasswordError("");
    setRepeatPasswordError("");
    let isInputValid = true;

    if (validator.isEmpty(fullname)) {
      setFullnameError("Please input your fullname");
      isInputValid = false;
    }
    if (validator.isEmpty(username)) {
      setUsernameError("Please input your username");
      isInputValid = false;
    }
    if (validator.isEmpty(email)) {
      setEmailError("Please input your email");
      isInputValid = false;
    }
    if (!validator.isEmail(email)) {
      setEmailError("Email input has invalid format");
      isInputValid = false;
    }
    if (validator.isEmpty(password)) {
      setPasswordError("Please input your password");
      isInputValid = false;
    }
    if (!validator.isLength(password, { min: 8 })) {
      setPasswordError("Your password must have at least 8 characters");
      isInputValid = false;
    }
    if (!/\d/.test(password)) {
      setPasswordError(
        "Your password must have at least 1 numerical character"
      );
      isInputValid = false;
    }
    if (!/\W/.test(password)) {
      setPasswordError("Your password must have at least 1 symbol character");
      isInputValid = false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError(
        "Your password must have at least 1 uppercase character"
      );
      isInputValid = false;
    }
    if (validator.isEmpty(repeatPassword)) {
      setRepeatPasswordError(
        "Please re-type your password here to confirm password"
      );
      isInputValid = false;
    }
    if (password !== repeatPassword) {
      setRepeatPasswordError("Repeat password and password must be the same");
      isInputValid = false;
    }
    return isInputValid;
  };

  const _register = async ({
    userUuid,
    fullname,
    username,
    email,
    password,
  }) => {
    const url = "http://localhost:8001/users/create";
    const formData = createFormData({
      userUuid,
      email,
      password,
      fullname,
      username,
    });

    try {
      return await axios.post(url, formData);
    } catch (error) {
      return error;
    }
  };

  const register = async () => {
    const { fullname, username, email, password, repeatPassword } = getInputs();

    if (
      isInputFormatValid(fullname, username, email, password, repeatPassword)
    ) {
      setIsWaiting(true);
      const userUuid = uuidv4();
      const response = await _register({
        userUuid,
        fullname,
        username,
        email,
        password,
      });
      if (response.status === 200) {
        alert(
          `${email} was created successfully! Please sign in with your created account`
        );
        history.push("/login");
      } else if (response.response) {
        setFormError(response.response.data.message);
      } else {
        setFormError("Internal server error");
      }
      setIsWaiting(false);
    }
  };

  return (
    <div className="w-100 h-100">
      <p
        className="py-3 px-4 m-0 d-none d-lg-block"
        style={{ textAlign: "right" }}
      >
        Already a member? <a href="/login">Sign In</a>
      </p>

      <div
        className="container d-flex flex-column align-items-center"
        style={{ marginTop: "20vh" }}
      >
        <div>
          <h5 className="mb-4 mx-3 d-lg-none">JUGGGLE</h5>

          <h3 className="mb-4 mx-3">
            <strong>Sign Up to Jugggle</strong>
          </h3>

          <h6 className="mb-4 mx-3 text-danger">
            <small>{formError}</small>
          </h6>

          <Form style={{ width: "100vw", maxWidth: "450px" }}>
            <Row className="px-3">
              <Col xs="12" md="12">
                <FormGroup floating>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Name"
                    type="text"
                    innerRef={fullnameRef}
                  />
                  <Label for="name">Full Name</Label>
                  <small className="text-danger">{fullnameError}</small>
                </FormGroup>
              </Col>
              <Col xs="12" md="12">
                <FormGroup floating>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    type="text"
                    innerRef={usernameRef}
                  />
                  <Label for="username">Username</Label>
                  <small className="text-danger">{usernameError}</small>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup floating className="mx-3">
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                innerRef={emailRef}
              />
              <Label for="email">Email</Label>
              <small className="text-danger">{emailError}</small>
            </FormGroup>

            <FormGroup className="position-relative mx-3" floating>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                innerRef={passwordRef}
              />
              <Label for="examplePassword">Password</Label>
              <small className="text-danger">{passwordError}</small>
            </FormGroup>

            <FormGroup className="position-relative mx-3" floating>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                innerRef={repeatPasswordRef}
              />
              <Label for="examplePassword">Repeat Password</Label>
              <small className="text-danger">{repeatPasswordError}</small>
            </FormGroup>

            <div className="d-flex justify-content-between align-items-center mx-3">
              <Button
                className="btn-danger"
                onClick={register}
                disabled={isWaiting}
              >
                Create Account
              </Button>
            </div>
          </Form>

          <p className="mt-3 mx-3 d-lg-none" style={{ textAlign: "left" }}>
            Already a member? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterContent;
