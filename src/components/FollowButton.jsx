import React, { useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

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
        userCtx.Token
      );

      if (res.ok) {
        console.log("Follow user:", userId);
        setIsFollowing(true);
      } else if (res.status === 429) {
        alert("Too many requests. Please try again later.");
      } else {
        alert(JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Error while following user:", error);
    }
  };

  // const handleUnfollow = async () => {

  //   console.log("Unfollow user:", userId);
  //   setIsFollowing(false);

  // };

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
