import React, { useEffect, useState, useContext, useRef } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import SideBarMenu from "../components/SideBarMenu";
import CommentDisplay from "../components/CommentDisplay";

import styles from "./PostPage.module.css";
import Avatar from "@mui/material/Avatar";

const PostPage = () => {
  const userCtx = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [postDetail, setPostDetail] = useState([]);
  const fetchData = useFetch();
  const { id } = useParams();

  const commentRef = useRef();

  const fetchUsername = async (userId) => {
    const userRes = await fetchData(
      `/api/users/${userId}`,
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (userRes.ok) {
      setUsername(userRes.data.username);
    } else {
      alert("Failed to fetch username");
    }
  };

  const getPostById = async () => {
    const res = await fetchData(
      `/api/posts/${id}`,
      "GET",
      undefined,
      userCtx.accessToken
    );
    console.log(res.data);
    if (res.ok) {
      setPostDetail(res.data);
      fetchUsername(res.data.user_id);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getPostById();
  }, [id]);

  return (
    <>
      <div className={styles.postPage}>
        <Navbar></Navbar>
        <SideBarMenu></SideBarMenu>
        <div className={styles.container}>
          <h1>{postDetail.title}</h1>
          <div className={styles.row}>
            <div className="col-md-4"></div>
            <Avatar alt="Name" src="/static/images/avatar/1.jpg" />
            <div className="col-md-1">{username}</div>
            <div className="col-md-4">Posted on {postDetail.created_at}</div>
          </div>
          <br />
          <img
            src="https://images.unsplash.com/photo-1612278675615-7b093b07772d?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className={styles.postImage}
          />

          <div className={styles.content}>{postDetail.content}</div>
        </div>

        <div className={`container ${styles.commentContainer}`}>
          <h2>Comments</h2>
          {postDetail.comments && postDetail.comments.length > 0 ? (
            <div>
              {postDetail.comments.map((comment, index) => (
                <CommentDisplay
                  key={index}
                  id={index}
                  userId={comment.user_id}
                  comment={comment.content}
                  createdAt={comment.created_at}
                ></CommentDisplay>
              ))}
            </div>
          ) : (
            <div>No comments found.</div>
          )}
          <input placeholder="Leave a comment (WIP)" ref={commentRef}></input>
          <button>send</button>
          <br />
          <br />
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default PostPage;
