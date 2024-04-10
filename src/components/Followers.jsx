import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import user from "../context/user";

const Followers = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const getUserFollowers = async () => {
    const res = await fetchData(
      "/api/users/" + userCtx.UserId,
      "GET",
      undefined,
      userCtx.accessToken
    );
  };

  return <div>Followers</div>;
};

export default Followers;
