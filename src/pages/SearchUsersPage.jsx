import React from "react";
import Navbar from "../components/Navbar";
import SideBarMenu from "../components/SideBarMenu";
import UserCardsDisplay from "../components/UserCardsDisplay";

const SearchUsersPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <SideBarMenu></SideBarMenu>
      <UserCardsDisplay></UserCardsDisplay>
    </>
  );
};

export default SearchUsersPage;
