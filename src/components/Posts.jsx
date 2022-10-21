import React from "react";
import { useState, useEffect, useContext, useCallback, useRef } from "react";

import { useHistory } from "react-router-dom";

import { Card, CardBody, CardSubtitle, Button } from "reactstrap";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye } from "@fortawesome/free-solid-svg-icons";

import styles from "../assets/Posts.module.css";

import Context from "../context";

const PostCard = function (props) {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 py-1">
      <Card className="border-0">
        <div>
          <a href={props.post.url}>
            <img
              className={`${styles.post_img} rounded`}
              alt="Sample"
              src={props.post.photoUrl}
            />
          </a>
        </div>

        <CardBody className="px-0">
          <CardSubtitle
            className="d-flex justify-content-between mb-2 text-muted"
            tag="h6"
          >
            <div className="d-flex">
              <a href={props.post.owner_url}>
                <div
                  className={`${styles.post_owner_photo} rounded-circle bg-primary`}
                ></div>
              </a>
              <div>
                <a
                  href={props.post.owner_url}
                  className={`${styles.post_owner_link} mx-2`}
                >
                  <strong>{props.post.owner_username}</strong>
                </a>
                <br />
                <small>{props.post.post_created_date}</small>
              </div>
            </div>

            <div className="d-flex">
              <p className="mx-2">
                <FontAwesomeIcon icon={faHeart} />{" "}
                {props.post.reactions_count || 0}
              </p>
            </div>
          </CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
};

const Posts = function (props) {
  const [isWaiting, setIsWaiting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsPage, setPostsPage] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  // const { user } = useContext(Context);

  const history = useHistory();

  // let loadUser = useCallback(async () => {
  //   try {
  //     const authenticatedUser = JSON.parse(localStorage.getItem("auth"));
  //     const userId = authenticatedUser.id;
  //     if (!userId && !user) {
  //       return;
  //     }
  //     setIsWaiting(true);
  //     const url = `http://localhost:8001/users/${userId}`;
  //     const response = await axios.get(url);
  //     if (response && response.data && response.data.message) {
  //       alert(response.data.message);
  //     } else {
  //       localStorage.setItem("auth", JSON.stringify(response.data[0]));
  //     }

  //     setIsWaiting(false);
  //   } catch (error) {
  //     setIsWaiting(false);
  //   }
  // }, [setIsWaiting]);

  let loadPosts = useCallback(async () => {
    try {
      setIsWaiting(true);
      const url = props.postsUrl;
      const response = await axios.get(url, {
        params: {
          posts_page: Number(postsPage),
        },
      });
      if (response && response.data && response.data.message) {
        alert(response.data.message);
      } else {
        const _posts = [...posts];
        for (let post of response.data) {
          const postContent = {
            url: `http://localhost:3000/post/${post.id}`,
            photoUrl: `http://localhost:8001${post.post_content}`,
            owner_username: post.user_username,
            owner_url: `http://localhost:3000/profile/${post.user_username}`,
            owner_photoUrl: `http://localhost:3000/profile/${post.user_avatar}`,
            reactions_count: post.post_number_of_reactions,
            post_created_date: post.post_created_date,
          };
          _posts.push(
            <PostCard post={postContent} key={`postcard_${post.id}`} />
          );
        }
        setPosts(_posts);
      }
      setIsWaiting(false);
    } catch (error) {
      setIsWaiting(false);
    }
  }, [setIsWaiting]);

  let handleMorePost = async () => {
    try {
      if (!hasMorePosts) {
        return;
      }
      setIsWaiting(true);
      const url = props.postsUrl;
      const response = await axios.get(url, {
        params: {
          posts_page: Number(postsPage) + 1,
        },
      });
      if (response && response.data && response.data.message) {
        alert(response.data.message);
      } else {
        if (response.data.length === 0) {
          setHasMorePosts(false);
          setIsWaiting(false);
          return;
        }
        const _posts = [...posts];
        for (let post of response.data) {
          const postContent = {
            url: `http://localhost:3000/post/${post.id}`,
            photoUrl: `http://localhost:8001${post.post_content}`,
            owner_username: post.user_username,
            owner_url: `http://localhost:3000/profile/${post.user_username}`,
            owner_photoUrl: `http://localhost:3000/profile/${post.user_avatar}`,
            reactions_count: post.post_number_of_reactions,
            post_created_date: post.post_created_date,
          };
          _posts.push(
            <PostCard post={postContent} key={`postcard_${post.id}`} />
          );
        }
        setPosts(_posts);
        setPostsPage(Number(postsPage) + 1);
      }
      setIsWaiting(false);
    } catch (error) {
      setIsWaiting(false);
    }
  };

  useEffect(() => {
    // loadUser();
    loadPosts();
  }, [loadPosts]);

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.scrollingElement.scrollHeight
    ) {
      handleMorePost();
    }
  };

  // if (!user) {
  //   return;
  // } else {
  //   // console.log(posts);
  // }

  return (
    <div className="container my-5">
      <div className="row">{posts}</div>
      <div className="d-flex justify-content-center"></div>
    </div>
  );
};

export default Posts;
