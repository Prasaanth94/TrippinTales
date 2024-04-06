import React, { useEffect, useState, useContext, useRef } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import SideBarMenu from "../components/SideBarMenu";
import styles from "./PostPage.module.css";

const PostPage = () => {
  const userCtx = useContext(UserContext);
  const [postDetail, setPostDetail] = useState([]);
  const fetchData = useFetch();
  const { id } = useParams();

  const commentRef = useRef();

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
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  // WIP
  const addCommentToPost = async () => {
    console.log(userCtx.userId); //WIP
    const res = await fetchData(
      "/api/add-comment",
      "PUT",
      {
        userId: userCtx.userId,
        postId: "660796b6e056e5bbc485eef5",
        content: commentRef.current.value,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      getPostById();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getPostById();
  }, [id]);

  console.log("postDetail:", postDetail);
  console.log("postDetail.comments:", postDetail && postDetail.comments);

  return (
    <>
      <div className={styles.postPage}>
        <Navbar></Navbar>
        <SideBarMenu></SideBarMenu>
        <div className="container content">
          <h1>{postDetail.title}</h1>
          <div className="row">
            <div className="col-md-6">By {postDetail.user_id}</div>
            <div className="col-md-6">{postDetail.created_at}</div>
          </div>
          <br />
          <p>INSERT POST IMAGE HERE {postDetail.images}</p>
          <p>{postDetail.content}</p>
        </div>
        <hr />
        <div className="container comment">
          <h2>Comments</h2>
          {postDetail.comments && postDetail.comments.length > 0 ? (
            <div>
              {postDetail.comments.map((comment, index) => (
                <div key={index}>
                  <strong>{comment.user_id}: </strong> {comment.content}
                </div>
              ))}
            </div>
          ) : (
            <div>No comments found.</div>
          )}
          <br />
          <input placeholder="Leave a comment" ref={commentRef}></input>
          <button onClick={() => alert("comment sent")}>send</button>
        </div>
      </div>
    </>
  );
};

export default PostPage;
