import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from "reactstrap";

// import NavAnonUser from "./NavAnonUser";
import { NavLoggedIn, NavAnonUser } from "./Nav";

const TopNavbar = function (args) {
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
          <NavAnonUser />
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopNavbar;
