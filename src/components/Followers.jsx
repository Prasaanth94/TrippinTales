import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./Follow.module.css";
import { useNavigate } from "react-router-dom";

const Followers = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [userFollowers, setUserFollowers] = useState([]);
  const navigate = useNavigate();

  const getUserFollowers = async () => {
    console.log(props.userFollowers);
    try {
      const userDataPromises = props.userFollowers.map(async (userId) => {
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
      setUserFollowers(userData.filter((user) => user !== null));
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileNavi = (id) => {
    navigate(`/ProfilePage/${id}`);
  };

  useEffect(() => {
    getUserFollowers();
  }, [props.userFollowers]);

  return (
    <>
      {userFollowers.length > 0 ? (
        <div>
          <h2>Following</h2>
          <div className={styles.cardsContainer}>
            {userFollowers.map((user) => (
              <div
                className={`container ${styles.profileCard}`}
                onClick={() => handleProfileNavi(user._id)}
              >
                <div key={user._id}>
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
                  <div>{user.username}</div>
                  <div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>No Followers</h1>
      )}
    </>
  );
};

export default Followers;
