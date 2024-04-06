import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import SideBarMenu from "../components/SideBarMenu";
import styles from "./PostPage.module.css";
import PostDisplay from "../components/PostDisplay";
import CommentDisplay from "../components/CommentDisplay";

import UserContext from "../context/user";

const PostPage = () => {
  const userCtx = useContext(UserContext);
  return (
    <>
      <div className={styles.postPage}>
        <Navbar></Navbar>
        <SideBarMenu></SideBarMenu>
        <div className={styles.postPage}>
          <PostDisplay postId={userCtx.postId}></PostDisplay>
          <hr />
          <CommentDisplay></CommentDisplay>
        </div>
      </div>
    </>
  );
};

export default PostPage;
