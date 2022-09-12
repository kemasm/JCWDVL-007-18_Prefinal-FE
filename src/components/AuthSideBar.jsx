import React from "react";

import styles from "../assets/Auth.module.css";

const AuthSideBar = function (props) {
  return (
    <div
      className={`${styles.auth_sidebar} d-none d-lg-flex flex-column h-100`}
      style={{ backgroundColor: props.sideBarContent.backgroundColor }}
    >
      <div className="p-5 pb-0 mb-3">
        <h3>JUGGGLE</h3>
      </div>
      <div className="px-5">
        <h1>
          <strong>Explore Design Portofolio Across the World</strong>
        </h1>
      </div>

      <div className={`${styles.image_container} mb-auto`}>
        <img src={props.sideBarContent.imgUrl} alt="" />
      </div>

      <div className="px-5 pb-3">
        <p>Art by {props.sideBarContent.artistName}</p>
      </div>
    </div>
  );
};

export default AuthSideBar;
