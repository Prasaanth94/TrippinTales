import React, { useEffect, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

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

  useEffect(() => {
    getTales();
  }, [userCtx.userId]);
  return (
    <div>
      {posts.map((item) => {
        return (
          <div>
            <h1>{item.title}</h1>
            <p>{item.meta_description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TalesBanner;
