import React, { useState, useContext, useRef } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import Context from "../context";

const UserDropdown = function ({ direction, ...props }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser } = useContext(Context);

  const history = useHistory();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    history.push("/login");
  };

  if (!user) {
    return;
  }

  return (
    <div className="d-flex mx-3">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle className="rounded-circle">
          {user.user_username[0]}
        </DropdownToggle>

        <DropdownMenu className="p-3" {...props}>
          <DropdownItem tag={Link} to={`/profile/${user.user_username}`}>
            My Posts
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to={"/settings"}>
            Account Settings
          </DropdownItem>
          <DropdownItem onClick={handleLogout}>Log Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

UserDropdown.propTypes = {
  direction: PropTypes.string,
};

const NavLoggedIn = function (props) {
  const [isWaiting, setIsWaiting] = useState(false);
  const [modal, setModal] = useState(false);
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();

  const { user } = useContext(Context);

  const captionRef = useRef(null);

  const handlePostPic = function (e) {
    setFilePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const toggle = () => {
    setFilePreview("");
    setFile();
    if (captionRef.current) {
      captionRef.current.value = "";
    }
    setModal(!modal);
  };

  const uploadPost = async (e) => {
    setIsWaiting(true);

    const userUuid = user.id;
    const caption = captionRef.current.value;

    if (!caption || !file) {
      alert("field can't be empty");
      setIsWaiting(false);
      return false;
    }

    const formData = new FormData();
    formData.append("post_image", file);
    formData.append("post_created_by", userUuid);
    formData.append("post_caption", caption);
    const url = "http://localhost:8001/posts";
    const response = await axios.post(url, formData);

    if (response.status === 200) {
      alert(`Post successfully saved!`);
    } else {
      alert("Internal server error");
    }

    toggle();
    setIsWaiting(false);
  };

  return (
    <Nav className="justify-content-end w-100" navbar>
      <NavItem>
        <UserDropdown></UserDropdown>
      </NavItem>

      <NavItem>
        <Button className="btn-danger" onClick={toggle}>
          Upload
        </Button>
      </NavItem>

      <Modal isOpen={modal} toggle={toggle} centered={true} {...props}>
        <ModalHeader toggle={toggle}>Upload Post</ModalHeader>
        <ModalBody>
          <Form style={{ width: "100vw", maxWidth: "450px" }}>
            <div
              className="bg-primary mx-3"
              style={{
                width: "100%",
                overflow: "hidden",
              }}
            >
              <img
                src={filePreview}
                alt="test"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </div>
            <FormGroup className="position-relative mx-3">
              <Label className="btn btn-primary mb-0 mt-3" for="postPicture">
                Pick Image
                <Input
                  id="postPicture"
                  name="postPicture"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={handlePostPic}
                  hidden
                />
              </Label>
            </FormGroup>

            <FormGroup className="mx-3">
              <Label for="email">Caption</Label>
              <Input
                id="caption"
                name="caption"
                placeholder="write caption here"
                type="text"
                innerRef={captionRef}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={uploadPost} disabled={isWaiting}>
            Upload
          </Button>{" "}
          <Button color="transparent" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
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
