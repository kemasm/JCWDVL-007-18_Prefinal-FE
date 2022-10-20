import React from "react";

import TopNavbar from "../components/TopNavBar";
import Hero from "../components/Hero";
import Posts from "../components/Posts";
import Footer from "../components/Footer";

const Home = function (props) {
  return (
    <div className="position-relative" style={{ minHeight: "100vh" }}>
      <div style={{ paddingBottom: "125px" }}>
        <TopNavbar color="light" expand="md" />
        <Hero />
        <Posts postsUrl="http://localhost:8001/posts" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
