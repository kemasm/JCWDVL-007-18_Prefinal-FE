import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";

const UserDropdown = function ({ direction, ...props }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex mx-3">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle className="btn-primary rounded-circle">
          K
        </DropdownToggle>

        <DropdownMenu className="p-3 mt-1" {...props}>
          <DropdownItem>My Posts</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Edit Profile</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Account Settings</DropdownItem>
          <DropdownItem>Log Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

UserDropdown.propTypes = {
  direction: PropTypes.string,
};

const NavLoggedIn = function (props) {
  return (
    <Nav className="justify-content-end w-100" navbar>
      <NavItem>
        <UserDropdown></UserDropdown>
      </NavItem>

      <NavItem>
        <Button className="btn-danger">Upload</Button>
      </NavItem>
    </Nav>
  );
};

const NavAnonUser = function (args) {
  return (
    <Nav className="justify-content-end w-100" navbar>
      <NavItem>
        <NavLink href="/components/">Sign In</NavLink>
      </NavItem>

      <NavItem>
        <Button className="btn-danger">Sign Up</Button>
      </NavItem>
    </Nav>
  );
};

export { NavLoggedIn, NavAnonUser };
