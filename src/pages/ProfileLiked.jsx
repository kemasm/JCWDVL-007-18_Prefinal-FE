import React from "react";
import { useState, useContext, useRef } from "react";

import { Nav, NavItem, NavLink } from "reactstrap";
import { useHistory } from "react-router-dom";

import TopNavbar from "../components/TopNavBar";
import ProfileHeader from "../components/ProfileHeader";
import Posts from "../components/Posts";
import Footer from "../components/Footer";
import Context from "../context";
import { useEffect } from "react";

const ProfileLIked = function (props) {
  const profileUsername = props.match.params.username;

  const history = useHistory();

  return (
    <div className="position-relative" style={{ minHeight: "120vh" }}>
      <div style={{ paddingBottom: "125px" }}>
        <TopNavbar color="light" expand="md" />
        <ProfileHeader profileUsername={profileUsername} />
        <div className="container my-3">
          <Nav tabs>
            <NavItem>
              <NavLink
                id="profile_post_tab"
                active={false}
                onClick={() => history.push(`/profile/${profileUsername}`)}
              >
                {profileUsername}'s posts
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                id="liked_post_tab"
                active={true}
                onClick={() =>
                  history.push(`/profile/liked/${profileUsername}`)
                }
              >
                liked posts
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        <Posts
          postsUrl={`http://localhost:8001/posts/user/like/${profileUsername}`}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProfileLIked;
