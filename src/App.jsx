import React, { Suspense, useState } from "react";
import LandingPage from "./pages/LandingPage";
import { Navigate, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import UserContext from "./context/user";
import AdminPage from "./pages/AdminPage";
import PostPage from "./pages/PostPage";

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
            element={
              isLoggedIn ? (
                role === "admin" ? (
                  <AdminPage />
                ) : (
                  <ProfilePage />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/post/id" element={<PostPage />}></Route>
        </Routes>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
