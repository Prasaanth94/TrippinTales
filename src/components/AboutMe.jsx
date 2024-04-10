import React from "react";
import styles from "./AboutMe.module.css";

const AboutMe = (props) => {
  return (
    <div className={styles.aboutMeContainer}>
      <div className={styles.detailCard}>
        <div>Details:</div>
        <div className={styles.names}>
          Name: {props.firstName} {props.lastName}
        </div>
        <div className={styles.gender}>Gender: {props.gender}</div>
        <div className={styles.date}>Date: {props.date}</div>
        <div className={styles.email}>Email: {props.email}</div>
      </div>
      <div className={styles.detailCard}>
        <div>About Me:</div>
        <div className={styles.selfDescription}>{props.selfDescription}</div>
      </div>
    </div>
  );
};

export default AboutMe;
