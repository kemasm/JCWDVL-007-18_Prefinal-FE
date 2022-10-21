import React, { useState, useContext } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from "reactstrap";

// import NavAnonUser from "./NavAnonUser";
import { NavLoggedIn, NavAnonUser } from "./Nav";

import Context from "../context";

const TopNavbar = function (args) {
  const { user } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args} className="px-4 py-2">
        {/* Brand */}
        <NavbarBrand href="/">JUGGGLE</NavbarBrand>

        {/* Toggle Button */}
        <NavbarToggler onClick={toggle} />

        {/* Navbar Menu */}
        <Collapse isOpen={isOpen} navbar>
          {user ? <NavLoggedIn /> : <NavAnonUser />}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopNavbar;
