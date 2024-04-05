import React, { useContext, useState } from "react";
import ReactDom from "react-dom";
import styles from "./LoginModal.module.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";

const LoginForm = (props) => {
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchData = useFetch();

  const login = async () => {
    try {
      const res = await fetchData("/auth/login", "POST", { email, password });
      console.log(email);
      console.log(password);
      console.log(res);
      if (res.ok) {
        userCtx.setAccessToken(res.data.access);
        const decoded = jwtDecode(res.data.access);
        userCtx.setRole(decoded.role);
      } else {
        alert(JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("login Error", error);
    }
  };

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
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            className={styles.passwordInput}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <button className={styles.LoginButton} onClick={login}>
          Login
        </button>
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
