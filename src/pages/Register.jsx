import React from "react";

import AuthSideBar from "../components/AuthSideBar";
import RegisterContent from "../components/RegisterContent";

const Register = function (props) {
  const sideBarContent = {
    artistName: "Peter Tarka",
    imgUrl:
      "https://cdn.dribbble.com/assets/auth/sign-up-2b63dbffcc69046adb0ec414be26771ce10d91a8f9b4de7c281bcbee9e95d9f9.png",
    backgroundColor: "#f2d083",
  };

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <AuthSideBar sideBarContent={sideBarContent} />
      <RegisterContent />
    </div>
  );
};

export default Register;
