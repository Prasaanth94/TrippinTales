import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./ProfileDisplay.module.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const PostDisplay = () => {
  return (
    <div className={styles.postPage}>
      <div className="row">
        <div className="col-md-4">Author profile pic</div>
        <div className="col-md-4">Author input username</div>
        <div className="col-md-4">Created at</div>
      </div>
      <div className="row">
        <div className="col-md-6">Insert tags</div>
      </div>
      <div className="row">
        <h1>Title</h1>
      </div>
      <div className="row">
        <p>Content</p>
      </div>
    </div>
  );
};

export default PostDisplay;
