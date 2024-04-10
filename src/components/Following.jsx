import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./Follow.module.css";
import { useNavigate } from "react-router-dom";

const Following = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  //the following users data
  const [followingUser, setfollowingUser] = useState([]);
  const navigate = useNavigate();

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

  const handleProfileNavi = (id) => {
    navigate(`/ProfilePage/${id}`);
  };

  useEffect(() => {
    getFollowingUsers();
  }, [props.userFollowing]);

  return (
    <div className={styles.cardsContainer}>
      {followingUser.length > 0 ? (
        <div className={styles.cards}>
          <div className={styles.followersTitle}>
            <h2>Following :</h2>
          </div>
          <div>
            {followingUser.map((user) => (
              <div onClick={() => handleProfileNavi(user._id)}>
                <div key={user._id} className={styles.profileCard}>
                  {user.profile_picture_url === "" ? (
                    <img
                      className={styles.profilePicture}
                      src="https://southernplasticsurgery.com.au/wp-content/uploads/2013/10/user-placeholder.png"
                      alt="profile picture"
                    />
                  ) : (
                    <img
                      className={styles.profilePicture}
                      src={user.profile_picture_url}
                      alt="profile picture"
                    />
                  )}
                  <div className={styles.username}>{user.username}</div>
                  <div className={styles.name}>
                    {user.first_name} {user.last_name}
                  </div>
                  <div className={styles.greeting}>{user.greeting}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.noFollowers}>
          <h1>Not Following Any Users</h1>
        </div>
      )}
    </div>
  );
};

export default Following;
Following;
