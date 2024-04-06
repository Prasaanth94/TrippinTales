import React, { useEffect, useState, useContext } from "react";
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

  useEffect(() => {
    getPostById();
  }, [id]);

  return (
    <>
      <div className={styles.postPage}>
        <Navbar></Navbar>
        <SideBarMenu></SideBarMenu>
        <div className="container content">
          <h1>{postDetail.title}</h1>
          <div className="row">
            <div className="col-md-3">By {postDetail.user_id}</div>
            <div className="col-md-3">{postDetail.created_at}</div>
          </div>
          <br />
          <p>INSERT POST IMAGE HERE {postDetail.images}</p>
          <p>{postDetail.content}</p>
        </div>
        <div className="container comment">
          <h1>POPULATE COMMENT HERE</h1>
        </div>
      </div>
    </>
  );
};

export default PostPage;
