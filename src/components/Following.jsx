import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const Following = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  //the following users data
  const [followingUser, setfollowingUser] = useState([]);

  const getFollowingUsers = async () => {
    try {
      const userDataPromises = props.userFollowing.map(async (userId) => {
        const res = await fetchData(
          "/api/users/" + userId,
          "GET",
          undefined,
          userCtx.accessToken
        );
        if (res.ok) {
          return res.data;
        } else {
          console.error(`Failed to fetch user data for user with if ${userId}`);
          return null;
        }
      });

      const userData = await Promise.all(userDataPromises);
      setfollowingUser(userData.filter((user) => user !== null));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFollowingUsers();
  }, [props.userFollowing]);

  return (
    <div>
      <h2>Following</h2>
      <ul>
        {followingUser.map((user) => (
          <li key={user._id}>
            <div>{user.username}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Following;
Following;
