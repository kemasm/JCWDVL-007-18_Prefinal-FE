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
    if (validator.isEmpty(fullname)) {
      alert("Please input your fullname");
      return false;
    }
    if (validator.isEmpty(username)) {
      alert("Please input your username");
      return false;
    }
    if (validator.isEmpty(email)) {
      alert("Please input your email");
      return false;
    }
    if (!validator.isEmail(email)) {
      alert("Email input has invalid format");
      return false;
    }
    if (validator.isEmpty(password)) {
      alert("Please input your password");
      return false;
    }
    if (!validator.isLength(password, { min: 8 })) {
      alert("Your password must have at least 8 characters");
      return false;
    }
    if (!/\d/.test(password)) {
      alert("Your password must have at least 1 numerical character");
      return false;
    }
    if (!/\W/.test(password)) {
      alert("Your password must have at least 1 symbol character");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      alert("Your password must have at least 1 uppercase character");
      return false;
    }
    if (validator.isEmpty(repeatPassword)) {
      alert("Please input your confirm password");
      return false;
    }
    if (password !== repeatPassword) {
      alert("Repeat password and password must be the same");
      return false;
    }
    return true;
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
        alert(response.response.data.message);
      } else {
        alert("Internal server error");
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

          <h3 className="mb-4 mx-3 ">
            <strong>Sign Up to Jugggle</strong>
          </h3>

          <Form style={{ width: "100vw", maxWidth: "450px" }}>
            <Row className="px-3">
              <Col xs="12" md="6">
                <FormGroup floating>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Name"
                    type="text"
                    innerRef={fullnameRef}
                  />
                  <Label for="name">Full Name</Label>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup floating>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    type="text"
                    innerRef={usernameRef}
                  />
                  <Label for="username">Username</Label>
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
            </FormGroup>

            <div className="d-flex justify-content-between align-items-center mx-3">
              <Button className="btn-danger" onClick={register}>
                Create Account
              </Button>
            </div>
          </Form>

          <p className="mt-3 mx-3 d-lg-none" style={{ textAlign: "left" }}>
            Already a member? <a href="#">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterContent;
