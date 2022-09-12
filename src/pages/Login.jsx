import React from "react";

import AuthSideBar from "../components/AuthSideBar";
import LoginContent from "../components/LoginContent";

const Login = function (props) {
  const sideBarContent = {
    artistName: "Irina Valeeva",
    imgUrl:
      "https://cdn.dribbble.com/assets/auth/sign-in-a63d9cf6c1f626ccbde669c582b10457b07523adb58c2a4b46833b7b4925d9a3.jpg",
    backgroundColor: "#f1cdd7",
  };

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <AuthSideBar sideBarContent={sideBarContent} />
      <LoginContent />
    </div>
  );
};

export default Login;
