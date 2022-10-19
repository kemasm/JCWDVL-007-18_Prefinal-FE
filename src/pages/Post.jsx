import React from "react";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";

import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap";

import axios from "axios";

import TopNavbar from "../components/TopNavBar";
import Footer from "../components/Footer";

import Context from "../context";

const CommentBlock = function (props) {
  return (
    <div className="d-flex align-items-center mb-3">
      <div
        className="bg-primary rounded-circle"
        style={{
          height: "65px",
          width: "65px",
          marginRight: "1rem",
          overflow: "hidden",
        }}
      >
        <img
          src={`http://localhost:8001${props.user_avatar}`}
          alt={props.user_username}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </div>
      <div className="w-75">
        <a>{props.user_username}</a> <small>{props.comment_created_date}</small>
        <p>{props.comment_content}</p>
      </div>
    </div>
  );
};

const PostPage = function (props) {
  const params = props.match.params;

  const [isWaiting, setIsWaiting] = useState(false);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(0);
  const [hasMoreComment, sethasMoreComment] = useState(true);
  const [isLike, setIsLike] = useState(null);
  const [likeCounter, setLikeCounter] = useState(0);

  const { user } = useContext(Context);

  const commentRef = useRef(null);

  const history = useHistory();

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
      }
      setIsWaiting(false);
    } catch (error) {
      setIsWaiting(false);
    }
  }, [setIsWaiting]);

  let loadComment = useCallback(async () => {
    if (!params.id) {
      return;
    }

    try {
      setIsWaiting(true);
      const url = `http://localhost:8001/posts/comments/${params.id}`;
      const response = await axios.get(url, {
        params: {
          comment_page: commentPage,
        },
      });
      if (response && response.data && response.data.message) {
        alert(response.data.message);
      } else {
        let _comments = [];
        for (let comment of response.data) {
          _comments.push(
            <CommentBlock
              user_username={comment.user_username}
              comment_content={comment.comment_content}
              user_avatar={comment.user_avatar}
              comment_created_date={comment.comment_created_date}
            />
          );
        }
        setComments(_comments);
      }
      setIsWaiting(false);
    } catch (error) {
      setIsWaiting(false);
    }
  }, [setIsWaiting]);

  let loadLikes = useCallback(async () => {
    if (!params.id) {
      return;
    }

    try {
      setIsWaiting(true);
      const authenticatedUser = JSON.parse(localStorage.getItem("auth"));
      const userId = authenticatedUser.id;
      const url = `http://localhost:8001/reactions/get/${params.id}/${userId}`;
      const response = await axios.get(url);
      if (response && response.data && response.data.message) {
        alert(response.data.message);
      } else {
        setLikeCounter(response.data.like_count);
        setIsLike(Boolean(response.data.is_like));
      }
      setIsWaiting(false);
    } catch (error) {
      setIsWaiting(false);
    }
  }, [setIsWaiting]);

  useEffect(() => {
    loadUser();
    loadPost();
    loadComment();
    loadLikes();
  }, [loadUser, loadPost, loadComment, loadLikes]);

  const handlePostComment = async () => {
    setIsWaiting(true);
    const post_id = post.id;
    const user_id = user.id;
    const comment_content = commentRef.current.value;

    if (!comment_content) {
      setIsWaiting(false);
      return false;
    }

    const url = "http://localhost:8001/posts/comments";
    try {
      const response = await axios.post(url, {
        post_id,
        user_id,
        comment_content,
      });
      if (response.status === 200) {
        alert("comment posted");
        commentRef.current.value = "";
        loadComment();
      } else if (response.response) {
        alert(response.response.data.message);
      } else {
        alert("Internal server error");
      }
    } catch (error) {
      return error;
    }
    setIsWaiting(false);
  };

  const handleLoadMoreComment = async () => {
    try {
      setIsWaiting(true);
      const url = `http://localhost:8001/posts/comments/${params.id}`;
      const response = await axios.get(url, {
        params: {
          comment_page: Number(commentPage) + 1,
        },
      });
      if (response && response.data && response.data.message) {
        alert(response.data.message);
      } else {
        if (response.data.length === 0) {
          sethasMoreComment(false);
          setIsWaiting(false);
          return;
        }
        let _comments = [...comments];
        for (let comment of response.data) {
          _comments.push(
            <CommentBlock
              user_username={comment.user_username}
              comment_content={comment.comment_content}
              user_avatar={comment.user_avatar}
              comment_created_date={comment.comment_created_date}
            />
          );
        }
        setComments(_comments);
        setCommentPage(Number(commentPage) + 1);
      }
      setIsWaiting(false);
    } catch (error) {
      setIsWaiting(false);
    }
  };

  const handleLike = async () => {
    try {
      setIsWaiting(true);
      const _isLike = !isLike;

      const url = _isLike
        ? `http://localhost:8001/reactions/create`
        : `http://localhost:8001/reactions/delete`;

      const response = await axios.post(url, {
        postId: post.id,
        userId: user.id,
      });
      if (response.status === 200) {
        setIsLike(_isLike);
        loadLikes();
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
            <div className="d-flex justify-content-between align-items-center">
              <div
                className="bg-primary rounded-circle"
                style={{
                  height: "65px",
                  width: "65px",
                  marginRight: "1rem",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`http://localhost:8001${post.user_avatar}`}
                  alt={post.user_username}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </div>
              <div className="mt-3">
                <h5>
                  <a>{post.user_full_name}</a>
                </h5>
                <p>
                  <small>{post.post_created_date}</small>
                </p>
              </div>
            </div>

            <div>
              <a
                className="btn btn-light mb-0 mt-3 mx-1"
                hidden={user.id !== post.post_created_by}
                href={`http://localhost:3000/post/edit/${params.id}`}
              >
                edit
              </a>
              <Button
                className="btn-danger mb-0 mt-3"
                // disabled={isWaiting}
                // hidden={user.user_is_verified}
                onClick={handleLike}
              >
                {isLike ? "Unlike" : "Like"}
              </Button>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div
            className="w-100 px-3 d-flex justify-content-between align-items-center"
            style={{ minHeight: "100px", maxWidth: "650px" }}
          >
            <div className="w-100 d-flex flex-column justify-content-center ">
              <div
                className="bg-light rounded mb-4"
                style={{
                  width: "100%",
                  marginRight: "1rem",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`http://localhost:8001${post.post_content}`}
                  // alt={post.post_caption}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </div>
              <div className="d-flex justify-content-end">
                <h6>{likeCounter} likes</h6>
              </div>
              <div className="d-flex justify-content-start mb-3 mx-3">
                <p>{post.post_caption}</p>
              </div>

              <div className="mb-5">
                <h5 className="mb-3">Comments</h5>

                <Form className="mb-4">
                  <FormGroup>
                    <Input
                      id="comment"
                      name="text"
                      type="textarea"
                      placeholder="Type your comments here ..."
                      innerRef={commentRef}
                      maxLength={300}
                    />
                  </FormGroup>

                  <div className="d-flex justify-content-end">
                    <Button
                      color="primary"
                      onClick={handlePostComment}
                      disabled={isWaiting}
                      size="sm"
                    >
                      Send Comment
                    </Button>
                  </div>
                </Form>

                {comments}
                <div className="d-flex justify-content-center">
                  <Button
                    color="light"
                    onClick={handleLoadMoreComment}
                    disabled={isWaiting || !hasMoreComment}
                  >
                    {hasMoreComment
                      ? "Load More Comments +"
                      : "No more comment"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostPage;
