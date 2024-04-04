import React, { Suspense } from "react";
import LandingPage from "./pages/LandingPage";
import { Navigate, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route
            path="/ProfilePage"
            element={<ProfilePage></ProfilePage>}
          ></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
