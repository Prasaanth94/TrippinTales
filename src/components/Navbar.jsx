import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <h1>Trippin' Tales</h1>
      {/* <input
        className={styles.navSearch}
        type="text"
        placeholder="Search User.."
      ></input> */}
    </div>
  );
}; //input as ICEBOX

export default Navbar;
