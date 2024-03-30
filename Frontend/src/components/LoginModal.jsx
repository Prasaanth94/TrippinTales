import React from "react";
import ReactDom from "react-dom";
import styles from "./LoginModal.module.css";

const LoginForm = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.crossContainer}>
          <i
            className={`bi bi-x-circle ${styles.cross}`}
            onClick={() => {
              props.setShowLoginModal(false);
            }}
          ></i>
        </div>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="User Name"
            className={styles.userNameInput}
          ></input>
          <input
            type="password"
            placeholder="Password"
            className={styles.passwordInput}
          ></input>
        </div>

        <button className={styles.LoginButton}>Login</button>
      </div>
    </div>
  );
};

const LoginModal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <LoginForm setShowLoginModal={props.setShowLoginModal}></LoginForm>,

        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default LoginModal;
