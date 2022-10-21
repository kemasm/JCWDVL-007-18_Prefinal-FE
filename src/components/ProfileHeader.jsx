import React from "react";
import { useState, useEffect, useContext, useCallback, useRef } from "react";

import axios from "axios";

import { Row, Col, Button } from "reactstrap";

import Context from "../context";

const ProfileHeader = function (props) {
  const profileUsername = props.profileUsername;

  const [profile, setProfile] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  let loadProfile = useCallback(async () => {
    try {
      setIsWaiting(true);
      const url = `http://localhost:8001/users/profile/${profileUsername}`;
      const response = await axios.get(url);
      if (response && response.data && response.data.message) {
        alert(response.data.message);
      } else {
        setProfile(response.data[0]);
      }
      setIsWaiting(false);
    } catch (error) {
      setIsWaiting(false);
    }
  }, [setIsWaiting]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (!profile) {
    return;
  }

  return (
    <div className="bg-light">
      <div className="container">
        <Row className="py-5" style={{}}>
          <Col
            className="d-flex flex-column justify-content-center p-0"
            sm="12"
            md="6"
          >
            <div className="d-flex align-items-end mb-2">
              <div
                className="bg-primary rounded-circle"
                style={{
                  height: "65px",
                  width: "65px",
                  marginRight: "1rem",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`http://localhost:8001${profile.user_avatar}`}
                  alt={profile.user_username}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </div>
              <h3>{profile.user_username}</h3>
            </div>

            <h1>
              <strong>{profile.user_bio}</strong>
            </h1>
            {/* <div className="mt-3">
              <Button color="danger" outline="True">
                <strong>+ Follow</strong>
              </Button>
            </div> */}
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
