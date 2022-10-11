import React from "react";
import { useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import AuthSideBar from "../components/AuthSideBar";
import VerifyContent from "../components/VerifyContent";

import Context from "../context";

const Verify = function (props) {
  const params = props.match.params;
  const sideBarContent = {
    artistName: "Irina Valeeva",
    imgUrl:
      "https://cdn.dribbble.com/assets/auth/sign-in-a63d9cf6c1f626ccbde669c582b10457b07523adb58c2a4b46833b7b4925d9a3.jpg",
    backgroundColor: "#f1cdd7",
  };

  const { setUser } = useContext(Context);

  const history = useHistory();

  const verify = async () => {
    const email = JSON.parse(localStorage.getItem("auth")).user_email;
    const verification_code = params.verification_code;
    const url = "http://localhost:8001/users/verify";
    try {
      const response = await axios.post(url, { email, verification_code });
      localStorage.setItem("auth", JSON.stringify(response.data));
      setUser(response.data);
      history.push("/");
      return response;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem("auth"));
    if (!authenticatedUser) {
      history.push("/login");
    } else if (authenticatedUser.user_is_verified !== 0) {
      history.push("/");
    } else {
      verify();
    }
  }, [history]);

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <AuthSideBar sideBarContent={sideBarContent} />
      <VerifyContent />
    </div>
  );
};

export default Verify;
