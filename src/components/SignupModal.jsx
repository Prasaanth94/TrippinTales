import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
import styles from "./LoginModal.module.css";
import useFetch from "../hooks/useFetch";

const SignupForm = (props) => {
  const fetchData = useFetch();
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [accCreated, setAccCreated] = useState(false);
  const [allFields, setAllFields] = useState(false);
  const [passwordMatch, setPasswordsMatch] = useState(false);
  const [error, setError] = useState("");

  const register = async () => {
    const userEmailCheck = emailRef.current?.value;
    const userNameCheck = userNameRef.current?.value;
    const passwordCheck = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    setIsLoading(true);
    setError("");
    setPasswordsMatch(false);
    if (!userEmailCheck || !userNameCheck || !passwordCheck) {
      setAllFields(true);
      setIsLoading(false);
      throw new Error("Please fill in all required fields.");
    }
    if (passwordCheck != passwordConfirm) {
      setPasswordsMatch(true);
      setIsLoading(false);
      throw new Error("Passwords do not match");
    }
    try {
      const res = await fetchData("/auth/register", "PUT", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        username: userNameRef.current.value,
      });
      if (res.ok) {
        setAccCreated(true);
        setAllFields(false);
        setIsLoading(false);
        props.setShowSignupModal(false);
        alert("Account Created");
      } else {
        setError(JSON.stringify(res.data));
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error registering", error);
    }
  };
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.crossContainer}>
          <i
            className={`bi bi-x-circle ${styles.cross}`}
            onClick={() => {
              props.setShowSignupModal(false);
            }}
          ></i>
        </div>
        <h1 className={styles.title}>Sign Up</h1>
        <div className={styles.inputField}>
          <input
            type="email"
            placeholder="Email"
            className={styles.userNameInput}
            ref={emailRef}
          ></input>
          <input
            type="text"
            placeholder="User Name"
            className={styles.userNameInput}
            ref={userNameRef}
          ></input>
          <input
            type="password"
            placeholder="Password"
            className={styles.passwordInput}
            ref={passwordRef}
          ></input>
          <input
            type="password"
            placeholder="Password"
            className={styles.passwordInput}
            ref={passwordConfirmRef}
          ></input>
        </div>

        <button className={styles.LoginButton} onClick={register}>
          SIGN UP
        </button>
        {accCreated && <div>account created</div>}
        {allFields && <div> Please Fill up all fields!</div>}
        {passwordMatch && <div>Passwords do not match!</div>}
        {error && <div>{error}</div>}
        {isLoading && (
          <div className={styles.ldsSpinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

const SignupModal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <SignupForm setShowSignupModal={props.setShowSignupModal}></SignupForm>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default SignupModal;
