import { PropaneSharp } from "@mui/icons-material";
import React from "react";

const ReportedPost = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          Author: {props.userId} [to be replaced by username]
        </div>
        <div className="row">Created at {props.createdAt.substring(0, 10)}</div>

        <div className="row">Title: {props.title}</div>
        <div className="row">Attachment: {props.images}</div>
        <div className="row">{props.content}</div>
        <br />
        <div className="row">
          <button
            className="col-md-3 btn btn-danger"
            onClick={() => props.deleteReportedPost(props.id)}
          >
            REMOVE POST
          </button>
        </div>
        <br />
        <hr />
      </div>
    </div>
  );
};

export default ReportedPost;
