import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
import styles from "./LoginModal.module.css";

const SignupForm = (props) => {
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [accCreated, setAccCreated] = useState(false);
  const [accUsed, setAccUsed] = useState(false);

  const signUp = async () => {
    const userEmailCheck = emailRef.current?.value;
    const userNameCheck = userNameRef.current?.value;
    const passwordCheck = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    setIsLoading(true);
    if (!userEmailCheck || !userNameCheck || !passwordCheck) {
      throw new Error("Please fill in all required fields.");
    }
    if (passwordCheck != passwordConfirm) {
      throw new Error("Passwords do not match");
    }
    try {
      const checkRes = await fetch(
        `https://api.airtable.com/v0/appX3cHFEZjVUNSSy/Table%201?filterByFormula={userEmail}='${userEmailCheck}'`,
        {
          headers: {
            Authorization: `Bearer patwfhcovftvmqSAU.fefdcf5630563c885938ffef4a7ced3f5512313245041508a4f2286766d63633`,
          },
        }
      );

      if (!checkRes.ok) {
        throw new Error("Failed to check if account exists!");
      }

      const data = await checkRes.json();

      if (data?.records.length > 0) {
        setIsLoading(false);
        setAccUsed(true);

        return;
      }
      const res = await fetch(
        `https://api.airtable.com/v0/appX3cHFEZjVUNSSy/Table%201`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer patwfhcovftvmqSAU.fefdcf5630563c885938ffef4a7ced3f5512313245041508a4f2286766d63633`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  userEmail: emailRef.current.value,
                  userName: userNameRef.current.value,
                  password: passwordRef.current.value,
                },
              },
            ],
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to sign up");
      }
      setIsLoading(false);
      setAccCreated(true);
    } catch (error) {
      console.error("There was an error!", error);
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

        <button className={styles.LoginButton} onClick={signUp}>
          SIGN UP
        </button>
        {accCreated && <div>account created</div>}
        {accUsed && <div>This email is already in Use</div>}
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
