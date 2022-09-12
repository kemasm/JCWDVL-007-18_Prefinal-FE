import React from "react";

import { NavbarBrand } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart, faEye } from "@fortawesome/free-solid-svg-icons";

import styles from "../assets/Footer.module.css";

const FooterTop = function (props) {
  return (
    <div className={`${styles.footer} d-flex justify-content-between bg-light`}>
      <NavbarBrand href="/">JUGGGLE</NavbarBrand>
      <div>
        <a className={styles.footer_brand} target="_blank" href="#">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a className={styles.footer_brand} target="_blank" href="#">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a className={styles.footer_brand} target="_blank" href="#">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a className={styles.footer_brand} target="_blank" href="#">
          <FontAwesomeIcon icon={faPinterest} />
        </a>
      </div>
    </div>
  );
};

const FooterBottom = function (props) {
  return (
    <div className={`${styles.footer} d-flex justify-content-between bg-light`}>
      <small>
        Design is based on © 2022 Dribbble. This site is made for the sake of
        educational purposes only.
      </small>
    </div>
  );
};

const Footer = function (props) {
  return (
    <div className="position-absolute w-100" style={{ bottom: "0" }}>
      <FooterTop /> <FooterBottom />
    </div>
  );
};

export default Footer;
