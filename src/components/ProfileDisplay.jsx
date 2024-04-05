import React, { useEffect, useState, useContext } from "react";
import styles from "./ProfileDisplay.module.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const ProfileDisplay = (props) => {
  const fetchData = useFetch();
  const [userdata, setUserData] = useState({});
  const [aboutMe, setAboutMe] = useState(false);
  const userCtx = useContext(UserContext);

  const getUserInfo = async () => {
    console.log(props.userId);
    try {
      const res = await fetchData(
        "/api/users/" + props.userId,
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
    if (props.userId) {
      getUserInfo();
    }
  }, [props.userId]);

  return (
    <div className={styles.ProfileDisplay}>
      <img
        src="https://hdrphotos.com/wp-content/uploads/2021/03/Spirit-Island-4k-RGB-2.jpg"
        alt="profile banner"
        className={styles.profileBanner}
      />

      <img
        className={styles.profilePicture}
        src="../public/20240215_GA99.jpg"
        alt="profile picture"
      />
      <div className="container">
        <h2 className={styles.usersName}>{userdata.first_name}</h2>
        <div className={styles.greetings}>
          <p>
            When I was a young boy, my father took me into the city, to see a
            marching band. He said, "Son, when you grow up, would you be the
            saviour of the broken, the beaten and the damned?"
          </p>
        </div>

        <div className={styles.profileMenu}>
          <div className={styles.menuStyle}>
            <h3 onClick={() => setAboutMe(true)}>About me</h3>
            <h3>My tales</h3>
            <h3>Friends</h3>
          </div>
        </div>
        {aboutMe && (
          <div>
            <h1>
              {userdata.first_name} {userdata.last_name}
            </h1>
            <h3>{userdata.gender}</h3>
            <h3>{userdata.birthdate}</h3>
            <h3>{userdata.email}</h3>
            <h3>{userdata.phone}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDisplay;
