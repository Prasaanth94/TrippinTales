import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./TalesBanner.module.css";

const TalesBanner = (props) => {
  const fetchData = useFetch();
  const [posts, setPosts] = useState([]);

  const userCtx = useContext(UserContext);
  const getTales = async () => {
    try {
      const res = await fetchData(
        "/api/" + props.dataId + "/posts",
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setPosts(res.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error met");
      console.error(error);
    }
  };

  useEffect(() => {
    getTales();
  }, [props.dataId]);

  return (
    <div>
      {posts.map((item) => {
        return (
          <div className={styles.postBanner}>
            <Link className={styles.textLink} to={`/posts/${item._id}`}>
              <h1>{item.title}</h1>
              <p>{item.meta_description}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TalesBanner;
