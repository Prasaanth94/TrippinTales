import React, { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const FollowButton = ({ userId, loggedInUserId, getUserInfo }) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    console.log(userId);
    console.log(userCtx.accessToken);
    try {
      const res = await fetchData(
        `/api/users/follow/${userId}`,
        "POST",
        undefined,
        userCtx.accessToken
      );

      if (res.ok) {
        console.log("Follow user:", userId);
      } else if (res.status === 429) {
        alert("Too many requests. Please try again later.");
      } else {
        alert(JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Error while following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const res = await fetchData(
        `/api/users/unfollow/${userId}`,
        "DELETE",
        undefined,
        userCtx.accessToken
      );
      if (res.status === 429) {
        alert("Too many requests. Please try again later.");
      } else {
        alert(JSON.stringify(res.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getLoggedInFollowing = async () => {
    try {
      const res = await fetchData(
        `/api/users/${userCtx.userId}`,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (!res.ok) {
        console.log("error getting Logged in user data");
      }
      const isFollowed = res.data.following.includes(userId);
      setIsFollowing(isFollowed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoggedInFollowing();
  }, []);

  if (userId === loggedInUserId) {
    return null;
  }

  return (
    <div>
      {isFollowing ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </div>
  );
};

export default FollowButton;
