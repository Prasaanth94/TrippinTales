import React, { useEffect, useState, useContext, useRef } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import SideBarMenu from "../components/SideBarMenu";
import CommentDisplay from "../components/CommentDisplay";
import UpdatePostModal from "../components/UpdatePostModal";

import styles from "./PostPage.module.css";
import Avatar from "@mui/material/Avatar";

const PostPage = () => {
  const userCtx = useContext(UserContext);
  const [postUsername, setPostUsername] = useState("");
  const [postDetail, setPostDetail] = useState([]);
  const [showPostUpdateModal, setShowPostUpdateModal] = useState(false);

  const fetchData = useFetch();
  const { id } = useParams();
  const commentRef = useRef();

  const fetchPostUsername = async (userId) => {
    const userRes = await fetchData(
      `/api/users/${userId}`,
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (userRes.ok) {
      setPostUsername(userRes.data.username);
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
      fetchPostUsername(res.data.user_id);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const deletePost = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");

    if (!confirmDelete) {
      return; // Do nothing if user cancels
    }

    const res = await fetchData(
      `/api/posts/${id}`,
      "DELETE",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      alert("Post deleted");
      window.location.href = "/ProfilePage";
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const addCommentToPost = async () => {
    // Fetch username of current user
    const currentUserRes = await fetchData(
      `/api/users/${userCtx.userId}`,
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (!currentUserRes.ok) {
      alert("Failed to fetch current user's username");
      return;
    }

    const currentUsername = currentUserRes.data.username;

    const res = await fetchData(
      "/api/comments",
      "PUT",
      {
        userId: userCtx.userId,
        postId: id,
        content: commentRef.current.value,
        username: currentUsername,
      },
      userCtx.accessToken
    );
    console.log(res.data);
    if (res.ok) {
      commentRef.current.value = "";
      getPostById();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getPostById();
  }, [id]);

  return (
    <>
      {showPostUpdateModal && (
        <UpdatePostModal
          id={postDetail._id}
          title={postDetail.title}
          content={postDetail.content}
          tags={postDetail.tags}
          images={postDetail.images}
          metaDescription={postDetail.meta_description}
          getPostById={getPostById}
          setShowPostUpdateModal={setShowPostUpdateModal}
        />
      )}

      <div className={styles.postPage}>
        <Navbar></Navbar>
        <SideBarMenu></SideBarMenu>
        <div className={styles.container}>
          <h1>{postDetail.title}</h1>
          <div className={styles.row}>
            <div className="col-md-4"></div>
            <Avatar alt="Name" src="/static/images/avatar/1.jpg" />
            <div className="col-md-1">{postUsername}</div>
            <div className="col-md-4">Posted on {postDetail.created_at}</div>
          </div>
          <div className={styles.managepost}>
            <button
              className="col-md-2 btn btn-secondary"
              onClick={() => setShowPostUpdateModal(true)}
            >
              Edit
            </button>
            <button className="col-md-2 btn btn-danger" onClick={deletePost}>
              Delete
            </button>
          </div>
          <img src={postDetail.images} className={styles.postImage} />

          <div className={styles.content}>{postDetail.content}</div>
        </div>

        <div className={`container ${styles.commentContainer}`}>
          <h2>Comments</h2>
          {postDetail.comments && postDetail.comments.length > 0 ? (
            <div>
              {postDetail.comments.map((comment, index) => (
                <CommentDisplay
                  key={index}
                  id={comment._id}
                  userId={comment.user_id}
                  comment={comment.content}
                  username={comment.username}
                  createdAt={comment.created_at}
                  getPostById={getPostById}
                  addCommentToPost={addCommentToPost}
                ></CommentDisplay>
              ))}
            </div>
          ) : (
            <div>No comments found.</div>
          )}
          <div className="container">
            <div className={styles.comment}>
              <Avatar alt="" src="/static/images/avatar/3.jpg" />
              <textarea
                class="form-control"
                placeholder="Add your comment"
                ref={commentRef}
              ></textarea>
              <button className="btn btn-primary" onClick={addCommentToPost}>
                Post
              </button>
            </div>
          </div>
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
