import React, { useRef, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const UserCardsDisplay = () => {
  const fetchData = useFetch();
  const [usersResult, setUsersResult] = useState([]);
  const [searchedUsername, setSearchedUsername] = useState(""); //for search result text

  const userCtx = useContext(UserContext);

  const usernameRef = useRef();

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
        console.log(usersResult);
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
      {searchedUsername && <h1>Search Results for {searchedUsername}:</h1>}
      {!searchedUsername && <h1>Search Results</h1>}
      {usersResult && usersResult.length === 0 ? (
        <h1>No user found.</h1>
      ) : (
        usersResult.map((user, index) => (
          <div key={index} className="searched-user-card">
            <h3>{user.username}</h3>
            <h5>
              {user.first_name} {user.last_name}
            </h5>
            <img src={user.image} alt={`Profile of ${user.username}`} />
          </div>
        ))
      )}
    </div>
  );
};

export default UserCardsDisplay;

// get body by username

//cards display the following:
// name
// user profile image -> need payload in users?
// greeting
