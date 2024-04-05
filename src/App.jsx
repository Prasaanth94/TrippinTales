import React, { Suspense, useState } from "react";
import LandingPage from "./pages/LandingPage";
import { Navigate, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import UserContext from "./context/user";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");

  const userContextValue = {
    accessToken,
    setAccessToken,
    role,
    setRole,
    userId,
    setUserId,
  };

  const isLoggedIn = !!accessToken;

  return (
    <UserContext.Provider value={userContextValue}>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/ProfilePage" /> : <LandingPage />
            }
          />
          <Route
            path="/ProfilePage"
            element={isLoggedIn ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
