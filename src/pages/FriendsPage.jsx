import { React, useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import SideBarMenu from "../components/SideBarMenu";
import Followers from "../components/Followers";
import Following from "../components/Following";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./FriendsPage.module.css";

const FriendsPage = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [followingDisplay, setFollowingDisplay] = useState(false);
  const [followersDisplay, setFollowersDisplay] = useState(false);
  //logged in users following
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);

  const getLoggedInUserFollowing = async () => {
    try {
      const res = await fetchData(
        "/api/users/" + userCtx.userId,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (!res.ok) {
        console.log("Cant Get User Data");
      } else {
        setUserFollowing(res.data.following);
        setUserFollowers(res.data.followers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollowersClick = () => {
    if (!followersDisplay) {
      setFollowersDisplay(true);
      setFollowingDisplay(false);
    } else if (followersDisplay) {
      setFollowersDisplay(false);
    }
  };

  const handleFollowingClick = () => {
    if (!followingDisplay) {
      setFollowingDisplay(true);
      setFollowersDisplay(false);
    } else if (followingDisplay) {
      setFollowingDisplay(false);
    }
  };

  useEffect(() => {
    getLoggedInUserFollowing();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <SideBarMenu></SideBarMenu>
      <div className={styles.buttonContainer}>
        <button
          className={styles.followersButton}
          onClick={handleFollowersClick}
        >
          Followers
        </button>
        <button
          className={`${styles.followersButton} ${styles.followingButton}`}
          onClick={handleFollowingClick}
        >
          Following
        </button>
      </div>
      {followersDisplay && (
        <Followers userFollowers={userFollowers}></Followers>
      )}
      {followingDisplay && (
        <Following userFollowing={userFollowing}></Following>
      )}
    </>
  );
};

export default FriendsPage;
