import React from "react";

import { Row, Col, Button } from "reactstrap";

const ProfileHeader = function () {
  return (
    <div className="bg-light">
      <div className="container">
        <Row className="py-5" style={{}}>
          <Col
            className="d-flex flex-column justify-content-center p-0"
            sm="12"
            md="6"
          >
            <h3>Username Here</h3>
            <h1>
              <strong>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit
              </strong>
            </h1>
            <div className="mt-3">
              <Button color="danger" outline="True">
                <strong>+ Follow</strong>
              </Button>
            </div>
          </Col>
          <Col className="position-relative p-0" sm="12" md="6">
            <div
              className="position-absolute bg-danger"
              style={{
                height: "100%",
                width: "50%",
                right: "-3rem",
                top: "-2rem",
              }}
            ></div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfileHeader;
