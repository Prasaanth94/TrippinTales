import React from "react";
import Avatar from "@mui/material/Avatar";

import styles from "../pages/PostPage.module.css";

const CommentDisplay = (props) => {
  return (
    <>
      <div className="container">
        <div className={styles.comment}>
          <Avatar alt="" src="/static/images/avatar/1.jpg" />
          <strong>{props.userId} </strong>
          {props.comment}
        </div>
      </div>
    </>
  );
};

export default CommentDisplay;
