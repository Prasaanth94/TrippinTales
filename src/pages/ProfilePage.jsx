import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideBarMenu from "../components/SideBarMenu";
import styles from "./ProfilePage.module.css";
import ProfileDisplay from "../components/ProfileDisplay";
import UserContext from "../context/user";
import UpdateProfilePage from "../components/UpdateProfilePage";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import UpdateProfileModal from "../components/UpdateProfileModal";
import FollowButton from "../components/FollowButton";

const ProfilePage = ({ userId }) => {
  const fetchData = useFetch();
  const [profile, setProfile] = useState(true);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const userCtx = useContext(UserContext);
  let { id } = useParams();
  if (!id) {
    id = userCtx.userId;
  }

  const getUserInfo = async () => {
    setError("");
    console.log(id);

    try {
      const res = await fetchData(
        "/api/users/" + (id || userId),
        "GET",
        undefined,
        userCtx.Token
      );
      if (res.ok) {
        setUserData(res.data);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    setProfile(true);
  }, [id, userId]);

  useEffect(() => {
    console.log(userData);
    console.log(userData._id); // Log userData
  }, [userData]);

  return (
    <>
      <div className={styles.profilePage}>
        <Navbar></Navbar>
        <SideBarMenu
          setProfile={setProfile}
          setUpdateProfile={setUpdateProfile}
        ></SideBarMenu>
        <FollowButton
          userId={id}
          loggedInUserId={userCtx.userId}
          getUserInfo={getUserInfo}
        />
        {profile && (
          <div className={styles.profileDisplay}>
            <ProfileDisplay
              userId={userCtx.userId}
              userData={userData}
              setUserData={setUserData}
              id={id}
            ></ProfileDisplay>
          </div>
        )}
        {updateProfile && (
          <div>
            <UpdateProfileModal
              setProfile={setProfile}
              setUpdateProfile={setUpdateProfile}
              userData={userData}
              getUserInfo={getUserInfo}
            ></UpdateProfileModal>
          </div>
        )}

        {/* {updateProfile && (
          <div>
            <UpdateProfilePage
              setProfile={setProfile}
              setUpdateProfile={setUpdateProfile}
              userData={userData}
              getUserInfo={getUserInfo}
            ></UpdateProfilePage>
          </div>
        )} */}
      </div>
    </>
  );
};

export default ProfilePage;
