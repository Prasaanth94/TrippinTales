import React, { useRef, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const UserCardsDisplay = () => {
  const fetchData = useFetch();
  const [users, setUsers] = useState([]);
  const [searchedUsername, setSearchedUsername] = useState(""); //for search result text

  const userCtx = useContext(UserContext);

  const usernameRef = useRef();

  const showSearchUsers = async () => {
    try {
      const res = await fetchData(
        "/api/users-username",
        "GET",
        { username: usernameRef.current.value },
        userCtx.Token
      );
      if (res.ok) {
        setUsers(res.data);
        setSearchedUsername(usernameRef.current.value);
      } else {
        alert(JSON.stringify(res.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <input ref={usernameRef} type="text" placeholder="Enter username" />
      <button onClick={showSearchUsers}>Search</button>
      <h1>Search Results for {searchedUsername}:</h1>
      <br />
      <br />
      {users.map((user, index) => (
        <div key={index} className="searched-user-card">
          <h3>
            {user.first_name}
            {""}
            {user.last_name}
          </h3>
          <img src={user.image} />
          <p>{user.greeting}</p>
        </div>
      ))}
    </div>
  );
};

export default UserCardsDisplay;

// get body by username

//cards display the following:
// name
// user profile image -> need payload in users?
// greeting
