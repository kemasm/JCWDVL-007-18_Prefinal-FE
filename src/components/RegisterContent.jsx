import React from "react";

import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";

import { PassFormGroup } from "./LoginContent";

const RegisterContent = function (props) {
  return (
    <div className="w-100 h-100">
      <p
        className="py-3 px-4 m-0 d-none d-lg-block"
        style={{ textAlign: "right" }}
      >
        Already a member? <a href="#">Sign In</a>
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
                  <Input id="name" name="name" placeholder="Name" type="text" />
                  <Label for="name">Name</Label>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup floating>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    type="text"
                  />
                  <Label for="username">Username</Label>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup floating className="mx-3">
              <Input id="email" name="email" placeholder="Email" type="email" />
              <Label for="email">Email</Label>
            </FormGroup>

            <PassFormGroup />

            <div className="d-flex justify-content-between align-items-center mx-3">
              <Button className="btn-danger">Create Account</Button>
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
