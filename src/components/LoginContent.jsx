import React from "react";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import styles from "../assets/Auth.module.css";

export const PassFormGroup = function () {
  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <FormGroup className="position-relative mx-3" floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type={passwordShown ? "text" : "password"}
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
  );
};

const LoginContent = function (props) {
  return (
    <div className="w-100 h-100">
      <p
        className="py-3 px-4 m-0 d-none d-lg-block"
        style={{ textAlign: "right" }}
      >
        Not a member yet? <a href="#">Sign Up Now</a>
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

          <Form style={{ width: "100vw", maxWidth: "450px" }}>
            <FormGroup floating className="mx-3">
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
              />
              <Label for="exampleEmail">Email</Label>
            </FormGroup>

            <PassFormGroup />

            <div className="d-flex justify-content-between align-items-center mx-3">
              <Button className="btn-danger">Sign In</Button>
              <a href="#">Forgot Password?</a>
            </div>
          </Form>

          <p className="mt-3 mx-3 d-lg-none" style={{ textAlign: "left" }}>
            Not a member yet? <a href="#">Sign Up Now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
