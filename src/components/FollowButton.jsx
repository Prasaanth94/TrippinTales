import React, { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./FollowButton.module.css";

const FollowButton = ({ userId, loggedInUserId, getUserInfo }) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    try {
      const res = await fetchData(
        `/api/users/follow/${userId}`,
        "POST",
        undefined,
        userCtx.accessToken
      );

      if (res.ok) {
        getLoggedInFollowing();
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
        alert("User Unfollowed");
      }
      getLoggedInFollowing();
    } catch (error) {
      console.error(error);
    }
  };
  //function to check if the current user profile is being followed by logged in id
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
        <button className={styles.buttonStyle} onClick={handleUnfollow}>
          Unfollow
        </button>
      ) : (
        <button className={styles.buttonStyle} onClick={handleFollow}>
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowButton;
