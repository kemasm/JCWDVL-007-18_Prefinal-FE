import React from "react";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";

import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap";

import axios from "axios";

import TopNavbar from "../components/TopNavBar";
import Footer from "../components/Footer";

import Context from "../context";

const PostEditPage = function (props) {
  const params = props.match.params;

  const history = useHistory();

  const [isWaiting, setIsWaiting] = useState(false);
  const [post, setPost] = useState(null);
  const { user } = useContext(Context);

  const editCaptionRef = useRef(null);

  let loadUser = useCallback(async () => {
    try {
      const authenticatedUser = JSON.parse(localStorage.getItem("auth"));
      const userId = authenticatedUser.id;
      if (!userId && !user) {
        return;
      }
      setIsWaiting(true);
      const url = `http://localhost:8001/users/${userId}`;
      const response = await axios.get(url);
      if (response && response.data && response.data.message) {
        alert(response.data.message);
      } else {
        localStorage.setItem("auth", JSON.stringify(response.data[0]));
      }

      setIsWaiting(false);
    } catch (error) {
      setIsWaiting(false);
    }
  }, [setIsWaiting]);

  let loadPost = useCallback(async () => {
    if (!params.id) {
      return;
    }

    try {
      setIsWaiting(true);
      const url = `http://localhost:8001/posts/${params.id}`;
      const response = await axios.get(url);
      if (response && response.data && response.data.message) {
        alert(response.data.message);
      } else {
        setPost(response.data[0]);
        editCaptionRef.current.value = response.data[0].post_caption;
      }
      setIsWaiting(false);
    } catch (error) {
      setIsWaiting(false);
    }
  }, [setIsWaiting]);

  useEffect(() => {
    loadUser();
    loadPost();
  }, [loadUser, loadPost]);

  const handleDeletePost = async () => {
    try {
      setIsWaiting(true);

      const url = `http://localhost:8001/posts/delete`;

      const response = await axios.post(url, {
        postId: post.id,
        userId: user.id,
      });

      if (response.status === 200) {
        history.push("/");
        return;
      } else if (response.response) {
        alert(response.response.data.message);
      } else {
        alert("Internal server error");
      }
    } catch (error) {
      alert(error);
    }
    setIsWaiting(false);
  };

  const handleUpdatePost = async () => {
    try {
      setIsWaiting(true);
      const url = `http://localhost:8001/posts/update`;
      const response = await axios.post(url, {
        postId: post.id,
        userId: user.id,
        post_caption: editCaptionRef.current.value,
      });

      if (response.status === 200) {
        history.push(`/post/${params.id}`);
        return;
      } else if (response.response) {
        alert(response.response.data.message);
      } else {
        alert("Internal server error");
      }
    } catch (error) {
      alert(error);
    }
    setIsWaiting(false);
  };

  if (!user || !post) {
    return;
  } else {
    // console.log(user.id);
    // console.log(post);
    // console.log(comments);
  }

  return (
    <div className="position-relative" style={{ minHeight: "100vh" }}>
      <div style={{ paddingBottom: "125px" }}>
        <TopNavbar color="light" expand="md" />
        <div className="d-flex justify-content-center">
          <div
            className="w-100 px-3 d-flex justify-content-between align-items-center"
            style={{ minHeight: "100px", maxWidth: "650px" }}
          >
            <a
              className="btn btn-outline mb-0 mt-3 mx-1"
              href={`http://localhost:3000/post/${params.id}`}
              // disabled={isWaiting}
              // hidden={user.user_is_verified}
              // onClick={resend}
            >
              Back to Post
            </a>
            <Button
              color="danger"
              className="mb-0 mt-3"
              outline
              // disabled={isWaiting}
              // hidden={user.user_is_verified}
              onClick={handleDeletePost}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div
            className="w-100 px-3 d-flex justify-content-between align-items-center"
            style={{ minHeight: "100px", maxWidth: "650px" }}
          >
            <div className="w-100 d-flex flex-column justify-content-center ">
              <div
                className="bg-primary rounded mb-5"
                style={{
                  width: "100%",
                  marginRight: "1rem",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`http://localhost:8001${post.post_content}`}
                  // alt={post.user_username}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </div>

              <Form className="mb-5">
                <FormGroup>
                  <Label for="caption">Caption</Label>
                  <Input
                    id="caption"
                    name="text"
                    type="textarea"
                    placeholder="Type your captions here ..."
                    innerRef={editCaptionRef}
                  />
                </FormGroup>

                <Button
                  color="primary"
                  onClick={handleUpdatePost}
                  disabled={isWaiting}
                >
                  Change Caption
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostEditPage;
