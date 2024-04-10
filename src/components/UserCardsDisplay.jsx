import React, { useRef, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import styles from "./UserCardsDisplay.module.css";

const UserCardsDisplay = () => {
  const fetchData = useFetch();
  const [usersResult, setUsersResult] = useState([]);
  const [searchedUsername, setSearchedUsername] = useState(""); //for search result text
  const [searchClicked, setSearchClicked] = useState(false); // to track whether search button clicked
  const userCtx = useContext(UserContext);
  const usernameRef = useRef();
  const navigate = useNavigate();

  const showSearchUsers = async () => {
    try {
      const res = await fetchData(
        "/api/users/" + usernameRef.current.value,
        "POST",
        undefined,
        userCtx.Token
      );
      if (res.ok) {
        setUsersResult(res.data.users);
        setSearchedUsername(usernameRef.current.value);
        setSearchClicked(true); // set to true when search button is clicked
      } else {
        alert(JSON.stringify(res.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileNavi = (id) => {
    navigate(`/ProfilePage/${id}`);
  };

  return (
    <div className={styles.profilePage}>
      <input
        ref={usernameRef}
        type="text"
        placeholder="Enter username"
        className={styles.input}
      />
      <button onClick={showSearchUsers} className={styles.button}>
        Search
      </button>

      {searchedUsername && (
        <div className={styles.title}>
          Search Results for {searchedUsername}:
        </div>
      )}
      {!searchedUsername && <div className={styles.title}>Search Results</div>}
      {searchClicked && usersResult && usersResult.length === 0 && (
        <div className={styles.title2}>No user found.</div>
      )}
      {usersResult &&
        usersResult.length > 0 &&
        usersResult.map((user, index) => (
          <div
            key={index}
            onClick={() => handleProfileNavi(user._id)}
            className={styles["searched-user-card"]}
          >
            <img src={user.image} alt={`Profile of ${user.username}`} />
            <h3>{user.username}</h3>
            <h5>
              {user.first_name} {user.last_name}
            </h5>
          </div>
        ))}
    </div>
  );
};

export default UserCardsDisplay;
