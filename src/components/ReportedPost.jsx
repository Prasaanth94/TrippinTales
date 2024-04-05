import React from "react";

const ReportedPost = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">[USER]</div>
          <div className="col-md-3">[CREATED AT]</div>
        </div>
        <div className="row">
          <div className="col-md-6">TITLE HERE</div>
        </div>
        <div className="row">
          <div className="col-md-6">IMAGES HERE</div>
        </div>
        <div className="row">
          <div className="col-md-6">CONTENT HERE</div>
        </div>
        <div className="row">
          <button className="col-md-3">REMOVE POST</button>
        </div>
      </div>
    </div>
  );
};

export default ReportedPost;
