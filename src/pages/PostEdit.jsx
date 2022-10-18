import React from "react";

import TopNavbar from "../components/TopNavBar";
import Footer from "../components/Footer";

import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap";

const PostEditPage = function (props) {
  return (
    <div className="position-relative" style={{ minHeight: "100vh" }}>
      <div style={{ paddingBottom: "125px" }}>
        <TopNavbar color="light" expand="md" />
        <div className="d-flex justify-content-center">
          <div
            className="w-100 px-3 d-flex justify-content-between align-items-center"
            style={{ minHeight: "100px", maxWidth: "650px" }}
          >
            <Button
              color="primary"
              className="mb-0 mt-3 mx-1"
              // disabled={isWaiting}
              // hidden={user.user_is_verified}
              // onClick={resend}
            >
              Change Image
            </Button>
            <Button
              color="secondary"
              className="mb-0 mt-3"
              // disabled={isWaiting}
              // hidden={user.user_is_verified}
              // onClick={resend}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div
            className="w-100 px-3 d-flex justify-content-between align-items-center"
            style={{ minHeight: "100px", maxWidth: "650px" }}
          >
            <div className="w-100 d-flex flex-column justify-content-center ">
              <div
                className="bg-primary rounded mb-5"
                style={{
                  height: "40vh",
                  width: "100%",
                  marginRight: "1rem",
                  overflow: "hidden",
                }}
              >
                <img
                  // src={`http://localhost:8001${userAvatar}`}
                  // alt={username}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </div>

              <Form className="mb-5">
                <FormGroup>
                  <Label for="caption">Caption</Label>
                  <Input
                    id="caption"
                    name="text"
                    type="textarea"
                    placeholder="Type your captions here ..."
                    // innerRef={bioRef}
                  />
                </FormGroup>

                <Button
                  color="primary"
                  // onClick={update}
                  // disabled={isWaiting}
                >
                  Change Caption
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostEditPage;
