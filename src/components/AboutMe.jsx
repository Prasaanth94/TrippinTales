import React from "react";
import styles from "./AboutMe.module.css";

const AboutMe = (props) => {
  return (
    <div className={styles.aboutMeContainer}>
      <h1 className={styles.names}>
        {props.firstName} {props.lastName}
      </h1>
      <h3 className={styles.gender}>{props.gender}</h3>
      <h3 className={styles.gender}>{props.date}</h3>
      <h3 className={styles.gender}>{props.email}</h3>

      <h3 className={styles.selfDescription}>{props.selfDescription}</h3>
    </div>
  );
};

export default AboutMe;
