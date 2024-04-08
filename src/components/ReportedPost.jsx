import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ReportedPost = (props) => {
  return (
    <div className="container">
      <Card sx={{ maxWidth: 1240 }}>
        <CardActionArea>
          <div className="container mt-2 mb-2">
            <div className="row">
              <Typography
                variant="body2"
                color="text.secondary"
                className="col-md-6"
              >
                By {props.username}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="col-md-6"
              >
                Created at {props.createdAt.substring(0, 10)}
              </Typography>
            </div>
          </div>

          <div className="container">
            <img height="300" src={props.images}></img>
          </div>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {props.content}
            </Typography>
            <br />
            <div className="d-flex justify-content-end">
              <button
                className="col-md-3 btn btn-danger"
                onClick={() => props.deleteReportedPost(props.id)}
              >
                REMOVE POST
              </button>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
    </div>
  );
};

export default ReportedPost;
