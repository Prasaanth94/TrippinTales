import React, { useState } from "react";
import styles from "./LandingPage.module.css";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const loginModal = () => {
    setShowLoginModal(true);
  };

  const signupModal = () => {
    setShowSignupModal(true);
  };

  return (
    <div className={styles.pageBackground}>
      <video autoPlay loop muted playsInline className={styles.BGvideo}>
        <source src="/landingpageBG.mp4" type="video/mp4"></source>
      </video>
      <div className={styles.content}>
        <div className={styles.title}>Trippin' Tales</div>

        <div className={styles.twoButtons}>
          <div className={styles.login} onClick={loginModal}>
            Login
          </div>
          <div className={styles.signup} onClick={signupModal}>
            Sign Up
          </div>
        </div>

        {showLoginModal && (
          <LoginModal setShowLoginModal={setShowLoginModal}></LoginModal>
        )}

        {showSignupModal && (
          <SignupModal setShowSignupModal={setShowSignupModal}></SignupModal>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
