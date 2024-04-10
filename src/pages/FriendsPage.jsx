import { React, useState } from "react";
import Navbar from "../components/Navbar";
import SideBarMenu from "../components/SideBarMenu";
import Followers from "../components/Followers";
import Following from "../components/Following";

const FriendsPage = () => {
  const [followingDisplay, setFollowingDisplay] = useState(false);
  const [followersDisplay, setFollowersDisplay] = useState(false);

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

  return (
    <>
      <Navbar></Navbar>
      <SideBarMenu></SideBarMenu>
      <button onClick={handleFollowersClick}>Followers</button>
      <button onClick={handleFollowingClick}>Following</button>
      {followersDisplay && <Followers></Followers>}
      {followingDisplay && <Following></Following>}
    </>
  );
};

export default FriendsPage;
