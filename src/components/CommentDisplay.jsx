import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "../pages/PostPage.module.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const CommentDisplay = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const deleteCommentFromPost = async () => {
    const res = await fetchData(
      "/api/comments",
      "DELETE",
      {
        _id: props.id,
      },
      userCtx.accessToken //added
    );

    if (res.ok) {
      props.getPostById();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <>
      <div className="container">
        <div className={styles.comment}>
          <Avatar alt="" src="/static/images/avatar/1.jpg" />
          <strong>{props.username}</strong>
          {props.comment}
          <div className={styles.iconContainer}>
            <DeleteOutlinedIcon
              className={styles.icon}
              color="action"
              onClick={deleteCommentFromPost}
            >
              delete
            </DeleteOutlinedIcon>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentDisplay;
