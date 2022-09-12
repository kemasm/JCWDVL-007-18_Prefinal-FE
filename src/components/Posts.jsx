import React from "react";

import { Card, CardBody, CardSubtitle } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye } from "@fortawesome/free-solid-svg-icons";

import styles from "../assets/Posts.module.css";

const PostCard = function (props) {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 py-1">
      <Card className="border-0">
        <a href={props.post.url}>
          <img
            className={`${styles.post_img} rounded`}
            alt="Sample"
            src={props.post.photoUrl}
          />
        </a>
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
              <a
                href={props.post.owner_url}
                className={`${styles.post_owner_link} mx-2`}
              >
                <strong>{props.post.owner_username}</strong>
              </a>
            </div>

            <div className="d-flex">
              <p className="mx-2">
                <FontAwesomeIcon icon={faHeart} /> 225
              </p>
              <p>
                <FontAwesomeIcon icon={faEye} /> 366.6k
              </p>
            </div>
          </CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
};

const Posts = function (props) {
  const dummyPost = {
    url: "#",
    photoUrl: "https://picsum.photos/300/200",
    owner_username: "Foo Bar",
    owner_url: "#",
    owner_photoUrl: undefined,
  };

  return (
    <div className="container my-5">
      <div className="row">
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
      </div>
    </div>
  );
};

export default Posts;
