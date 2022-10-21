import React from "react";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";

import Context from "../context";

import axios from "axios";

import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap";

import TopNavbar from "../components/TopNavBar";
import Footer from "../components/Footer";

const SettingsPage = function (props) {
  // const params = props.match.params;

  const [username, setUsername] = useState("");
  const { user, setUser } = useContext(Context);
  const [isWaiting, setIsWaiting] = React.useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [errorForm, setErrorForm] = useState("");
  const [isVerified, setIsVerified] = useState(true);

  const history = useHistory();

  const fullnameRef = useRef(null);
  const bioRef = useRef(null);
  const usernameRef = useRef(null);
  const avatarRef = useRef(null);
  const emailRef = useRef(null);

  let loadUser = useCallback(async () => {
    try {
      const authenticatedUser = JSON.parse(localStorage.getItem("auth"));
      const userId = authenticatedUser.id;
      if (!userId && !user) {
        return;
      }
      setIsWaiting(true);
      const url = `http://localhost:8001/users/${userId}`;
      const response = await axios.get(url);
      if (response && response.data && response.data.message) {
        alert(response.data.message);
      } else {
        setUsername(response.data[0].user_username);
        setUserAvatar(response.data[0].user_avatar);
        setIsVerified(response.data[0].user_is_verified);
        setUser(response.data[0]);
        localStorage.setItem("auth", JSON.stringify(response.data[0]));
        fullnameRef.current.value = response.data[0].user_full_name;
        bioRef.current.value = response.data[0].user_bio;
        usernameRef.current.value = response.data[0].user_username;
        emailRef.current.value = response.data[0].user_email;
      }
      setIsWaiting(false);
    } catch (error) {
      setIsWaiting(false);
    }
  }, [setIsWaiting]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const getInputs = () => {
    const fullname = fullnameRef.current.value;
    const bio = bioRef.current.value;
    const username = usernameRef.current.value;
    return { fullname, bio, username };
  };

  const isInputFormatValid = (fullname, bio, username) => {
    if (!fullname || !bio || !username) {
      setErrorForm("inputs can't be empty");
      return false;
    }
    return true;
  };

  const _update = async (userUuid, fullname, bio, username) => {
    const url = "http://localhost:8001/users/update";
    try {
      return await axios.post(url, { userUuid, fullname, username, bio });
    } catch (error) {
      return error;
    }
  };

  const update = async () => {
    if (!isVerified) {
      return;
    }

    const userUuid = user.id;
    const { fullname, bio, username } = getInputs();
    const isValid = isInputFormatValid(fullname, bio, username);

    if (isValid) {
      setIsWaiting(true);
      const response = await _update(userUuid, fullname, bio, username);
      if (response.status === 200) {
        alert("profile updated");
        loadUser();
        history.push(`/profile/${username}`);
      } else if (response.response) {
        setErrorForm(response.response.data.message);
      } else {
        setErrorForm("Internal server error");
      }
      setIsWaiting(false);
    }
  };

  const uploadImage = async (e) => {
    if (!isVerified) {
      return;
    }
    const userUuid = user.id;
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    formData.append("userUuid", userUuid);
    const url = "http://localhost:8001/users/updateImage";
    setIsWaiting(true);
    const response = await axios.post(url, formData);
    setUserAvatar(response.data.avatar);
    setIsWaiting(false);
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const _resend = async (email) => {
    const url = "http://localhost:8001/users/resend_mail";
    try {
      return await axios.post(url, { email });
    } catch (error) {
      return error;
    }
  };

  const resend = async () => {
    setIsWaiting(true);

    const email = JSON.parse(localStorage.getItem("auth")).user_email;
    const response = await _resend(email);

    if (response.status === 200) {
      alert(`email was successfully sent! Please check your inbox.`);
    } else {
      alert("Internal server error");
    }

    await delay(30000);
    setIsWaiting(false);
  };

  if (!user) {
    return;
  }

  return (
    <div className="position-relative" style={{ minHeight: "100vh" }}>
      <div style={{ paddingBottom: "125px" }}>
        <TopNavbar color="light" expand="md" />
        <div className="d-flex justify-content-center">
          <div
            className="w-100 px-3"
            style={{ minHeight: "100px", maxWidth: "650px" }}
          >
            <h4 className="mt-5">{username} / Account Settings</h4>

            <div className="p-3 bg-warning rounded mt-5" hidden={isVerified}>
              <h6>
                <small>
                  Please verify your account before updating your profile.
                  <br />
                  We've sent verification link to your email.
                  <br />
                  You can send a new verification link by pressing the button
                  below.
                </small>
              </h6>
            </div>

            <h6 className="mb-3 mt-5 text-danger">
              <small>{errorForm}</small>
            </h6>
            <Form className="d-flex align-items-center mb-4">
              <div
                className="bg-secondary rounded-circle"
                style={{
                  height: "85px",
                  width: "85px",
                  marginRight: "2rem",
                  overflow: "hidden",
                }}
              >
                <img
                  className="text-center d-flex justify-content-center align-items-center text-white"
                  src={userAvatar ? `http://localhost:8001${userAvatar}` : ""}
                  alt={user.user_username[0]}
                  style={{
                    width: "100%",
                    height: "100%",
                    fontSize: "2em",
                  }}
                />
              </div>
              <FormGroup>
                <Label
                  className={`btn btn-primary mb-0 mt-3 ${
                    isWaiting || !isVerified ? "disabled" : ""
                  }`}
                  for="profilePicture"
                >
                  Change Profile Picture
                  <Input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={uploadImage}
                    hidden
                  />
                </Label>

                <Button
                  className="btn-danger mb-0 mt-3 mx-3"
                  disabled={isWaiting}
                  hidden={isVerified}
                  onClick={resend}
                >
                  Resend Verification Email
                </Button>
              </FormGroup>
            </Form>

            <Form>
              <FormGroup floating>
                <Input
                  id="email"
                  name="email"
                  placeholder="email"
                  type="email"
                  innerRef={emailRef}
                  disabled={true}
                />
                <Label for="email">Email</Label>
              </FormGroup>

              <FormGroup floating>
                <Input
                  id="username"
                  name="username"
                  placeholder="Name"
                  type="text"
                  innerRef={usernameRef}
                  disabled={!isVerified}
                />
                <Label for="username">Username</Label>
              </FormGroup>

              <FormGroup floating>
                <Input
                  id="fullname"
                  name="fullname"
                  placeholder="Name"
                  type="text"
                  innerRef={fullnameRef}
                  disabled={!isVerified}
                />
                <Label for="fullname">Full Name</Label>
              </FormGroup>

              <FormGroup floating>
                <Input
                  id="bio"
                  name="text"
                  type="textarea"
                  innerRef={bioRef}
                  disabled={!isVerified}
                />
                <Label for="bio">Bio</Label>
              </FormGroup>

              <Button onClick={update} disabled={isWaiting || !isVerified}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
