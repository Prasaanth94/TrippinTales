import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import SideBarMenu from "../components/SideBarMenu";
import styles from "./ProfilePage.module.css";
import ProfileDisplay from "../components/ProfileDisplay";
import UserContext from "../context/user";

const ProfilePage = () => {
  const userCtx = useContext(UserContext);
  return (
    <>
      <div className={styles.profilePage}>
        <Navbar></Navbar>
        <SideBarMenu></SideBarMenu>
        <div className={styles.profileDisplay}>
          <ProfileDisplay userId={userCtx.userId}></ProfileDisplay>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
