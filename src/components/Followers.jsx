import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const Followers = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [userFollowers, setUserFollowers] = useState([]);

  const getUserFollowers = async () => {
    try {
      const userDataPromises = props.userFollowers.map(async (userId) => {
        const res = await fetchData(
          "/api/users/" + userId,
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

  useEffect(() => {
    getUserFollowers;
  }, [props.getUserFollowers]);

  return (
    <>
      {userFollowers.length > 0 ? (
        <div>
          <h2>Followers</h2>
          <ul>
            {userFollowers.map((user) => (
              <li key={user._id}>
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
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1>No Followers</h1>
      )}
    </>
  );
};

export default Followers;
