import React from "react";

import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap";

import TopNavbar from "../components/TopNavBar";
import Footer from "../components/Footer";

const SettingsPage = function (props) {
  return (
    <div className="position-relative" style={{ minHeight: "100vh" }}>
      <div style={{ paddingBottom: "125px" }}>
        <TopNavbar color="light" expand="md" />
        <div className="d-flex justify-content-center">
          <div
            className="w-100 px-3"
            style={{ minHeight: "100px", maxWidth: "650px" }}
          >
            <h4 className="my-5">Foo Bar / Account Settings</h4>

            <Form className="d-flex align-items-center mb-4">
              <div
                className="bg-primary rounded-circle"
                style={{ height: "85px", width: "85px", marginRight: "2rem" }}
              ></div>
              <FormGroup>
                <Label
                  className="btn btn-primary mb-0 mt-3"
                  for="profilePicture"
                >
                  Change Profile Picture
                  <Input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    hidden
                  />
                </Label>
              </FormGroup>
            </Form>

            <Form>
              <FormGroup>
                <Label for="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  placeholder="Name"
                  type="text"
                />
              </FormGroup>

              <FormGroup>
                <Label for="bio">Bio</Label>
                <Input id="bio" name="text" type="textarea" />
              </FormGroup>

              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Name"
                  type="text"
                />
              </FormGroup>

              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="email"
                  type="email"
                />
              </FormGroup>

              <Button>Submit</Button>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
