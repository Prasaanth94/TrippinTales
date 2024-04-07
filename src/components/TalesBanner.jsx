import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./TalesBanner.module.css";

const TalesBanner = () => {
  const fetchData = useFetch();
  const [posts, setPosts] = useState([]);

  const userCtx = useContext(UserContext);
  const getTales = async () => {
    console.log(userCtx.userId);

    try {
      const res = await fetchData(
        "/api/" + userCtx.userId + "/posts",
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setPosts(res.data);
        console.log(res.data);
      } else {
        console.log("error");
        console.log(res);
      }
    } catch (error) {
      console.log("error met");
      console.error(error);
    }
  };

  const deleteTale = async (id) => {
    try {
      const res = await fetchData(
        "/api/posts/" + id,
        "DELETE",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        getTales();
      } else {
        alert(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTales();
  }, [userCtx.userId]);

  return (
    <div>
      {posts.map((item) => {
        return (
          <div className={styles.postBanner}>
            <Link className={styles.textLink} to={`/posts/${item._id}`}>
              <h1>{item.title}</h1>
              <p>{item.meta_description}</p>
            </Link>
            {/* =======
          <div className={styles.postContainer}>
            <div className={styles.postBanner}>
              <h1>{item.title}</h1>
              <p>{item.meta_description}</p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => deleteTale(item._id)}
            >
              Delete
            </button> */}
          </div>
        );
      })}
    </div>
  );
};

export default TalesBanner;
