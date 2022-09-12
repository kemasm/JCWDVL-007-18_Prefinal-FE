import React from "react";

import TopNavbar from "../components/TopNavBar";
import ProfileHeader from "../components/ProfileHeader";
import Posts from "../components/Posts";
import Footer from "../components/Footer";

const Profile = function (props) {
  return (
    <div className="position-relative" style={{ minHeight: "100vh" }}>
      <div style={{ paddingBottom: "125px" }}>
        <TopNavbar color="light" expand="md" />
        <ProfileHeader />
        <Posts />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
