import React, { useState, useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./UpdatePostModal.module.css";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const OverLay = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to upload file to S3 and update user schema
  const uploadFile = () => {
    console.log("Selected file:", selectedFile);

    // Ensure that a file is selected
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    // Construct the S3 URL to upload the file
    const s3Url =
      "https://trippintalesdp.s3.ap-southeast-1.amazonaws.com/" +
      selectedFile.name;
    // Make a PUT request to upload the file to S3
    fetch(s3Url, {
      method: "PUT",
      body: selectedFile,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to upload file to S3");
        }
        console.log("File uploaded successfully");
        // Update user profile picture and fetch updated user data
        await updateUserProfileBanner(s3Url);
        await fetchUpdatedUserData();

        props.setShowBannerUploadModal(false); // Close the modal after file upload
      })
      .catch((error) => {
        console.error("Error uploading file to S3:", error);
      });
  };

  const updateUserProfileBanner = async (s3Url) => {
    const res = await fetchData(
      "/api/users/" + userCtx.userId,
      "PATCH",
      {
        first_name: props.userData.first_name,
        last_name: props.userData.last_name,
        profile_banner_url: s3Url,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      console.log("User profile banner updated successfully");
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const fetchUpdatedUserData = async () => {
    try {
      const res = await fetchData(
        "/api/users/" + userCtx.userId,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        console.log("Updated user data fetched successfully:", res.data);
        props.setUserData(res.data); // Update userData with the fetched data
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error fetching updated user data:", error);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h4 className="modal-title">Change Banner</h4>
        </div>
        <br />
        <div
          className={`col-md-12 d-flex justify-content-center ${styles.content}`}
        >
          <input type="file" onChange={handleFileChange} />
        </div>
        <br />
        <div className={`row ${styles.footer}`}>
          <div className="col-md-12 d-flex justify-content-center">
            <button
              onClick={() => props.setShowBannerUploadModal(false)}
              className="col-md-2 btn btn-secondary"
            >
              Close
            </button>
            <button onClick={uploadFile} className="col-md-3 btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

const FileUploadModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          setShowBannerUploadModal={props.setShowBannerUploadModal}
          setUserData={props.setUserData}
          userData={props.userData}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default FileUploadModal;
