import React from "react";

import { Input, InputGroup, InputGroupText } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "../assets/Hero.module.css";

const HeroCategoryButton = function (props) {
  let _className = props.active
    ? `${styles.hero_btn} btn btn-light mx-2`
    : `${styles.hero_btn} btn btn-outline-light mx-2`;

  return (
    <a className={_className} href="#">
      {props.name}
    </a>
  );
};

const HeroCategorySelector = function (props) {
  const categories = [
    "Discover",
    "Animation",
    "Branding",
    "Illustration",
    "Mobile",
    "Print",
    "Typography",
    "Web Design",
  ];

  return (
    <div
      className="d-none d-lg-flex justify-content-center mb-4"
      style={{ minWidth: "884px" }}
    >
      {categories.map((category, idx) => {
        return idx === 0 ? (
          <HeroCategoryButton name={category} active />
        ) : (
          <HeroCategoryButton name={category} />
        );
      })}
    </div>
  );
};

const HeroLead = function () {
  return (
    <div className={`${styles.hero_lead} text-center text-white`}>
      <h1 className="mb-3">
        <strong>Explore Design Portofolio Across the World</strong>
      </h1>
      <p className="mb-4">
        Millions of designers and agencies around the world showcase their
        portfolio work on Jugggle - the home to the world’s best design and
        creative professionals.
      </p>
    </div>
  );
};

const HeroSearchBar = function () {
  return (
    <InputGroup className={`${styles.hero_search_bar} bg-white mb-4`}>
      <InputGroupText className="bg-transparent border-0">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </InputGroupText>
      <Input className="bg-transparent border-0" placeholder="Search..." />
    </InputGroup>
  );
};

const Hero = function () {
  return (
    <div
      className={`${styles.hero} d-flex flex-column align-items-center position-relative w-100`}
    >
      <video className="position-absolute" autoPlay muted loop>
        <source src="https://cdn.dribbble.com/uploads/39417/original/49dbf46eae15d227fc95a69cee31251e.mp4?1657824906" />
      </video>
      <HeroCategorySelector />
      <HeroLead />
      <HeroSearchBar />
    </div>
  );
};

export default Hero;
