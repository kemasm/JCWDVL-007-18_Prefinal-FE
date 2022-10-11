import React from "react";

import { useHistory } from "react-router-dom";

import validator from "validator";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import styles from "../assets/Auth.module.css";

import Context from "../context";

const VerifyContent = function (props) {
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

          <p className="mb-4 mx-3 ">You'll be redirected to the Home page.</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyContent;
