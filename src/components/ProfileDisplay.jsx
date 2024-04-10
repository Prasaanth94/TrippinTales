import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./ProfileDisplay.module.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import TalesBanner from "./TalesBanner";
import moment from "moment";
import FileUploadModal from "./FileUploadModal";
import BannerUploadModal from "./BannerUploadModal";

const ProfileDisplay = ({ userData, setUserData, id }) => {
  const fetchData = useFetch();
  const { birthdate } = userData;
  const birthdateMoment = moment(birthdate);
  const formattedDate = birthdateMoment.format("MMMM DD, YYYY");
  const [aboutMe, setAboutMe] = useState(false);
  const [allTales, setAllTales] = useState(true);
  const [createPostForm, setCreatePostForm] = useState(false);
  const [error, setError] = useState("");
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [showBannerUploadModal, setShowBannerUploadModal] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();
  const urlRef = useRef();
  const slugRef = useRef();
  const tagsRef = useRef();
  const meta_descriptionRef = useRef();
  const userCtx = useContext(UserContext);

  const handleAboutMe = () => {
    setCreatePostForm(false);
    setAllTales(false);
    console.log(id.id);
    if (!aboutMe) {
      setAboutMe(true);
    } else if (aboutMe) {
      setAboutMe(false);
    }
  };

  const handleCreatePost = () => {
    setAboutMe(false);
    setAllTales(false);
    if (!createPostForm) {
      setCreatePostForm(true);
    } else if (createPostForm) {
      setCreatePostForm(false);
    }
  };

  const handleTales = () => {
    setAboutMe(false);
    setCreatePostForm(false);
    if (!allTales) {
      setAllTales(true);
    } else if (allTales) {
      setAllTales(false);
    }
  };

  const createPost = async () => {
    try {
      const res = await fetchData(
        "/api/posts",
        "PUT",
        {
          title: titleRef.current.value,
          content: contentRef.current.value,
          user_id: userCtx.userId,
          created_at: { type: Date, default: Date.now },
          url: urlRef.current.value,
          slug: slugRef.current.value,
          tags: tagsRef.current.value,
          meta_description: meta_descriptionRef.current.value,
        },
        userCtx.accessToken
      );

      if (!res.ok) {
        setError(res.data);
        console.log(error);
      } else {
        setCreatePostForm(false);
        setAllTales(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addProfilePicture = () => {
    setShowFileUploadModal(true);
  };

  const addProfileBanner = () => {
    setShowBannerUploadModal(true);
  };

  useEffect(() => {
    if (userData.userId) {
      getUserInfo();
    }
  }, [userData.userId]);

  return (
    <div className={styles.ProfileDisplay}>
      {userData.profile_banner_url === "" ? (
        <img
          className={styles.profileBanner}
          src="https://hdrphotos.com/wp-content/uploads/2021/03/Spirit-Island-4k-RGB-2.jpg"
          alt="profile banner"
          onClick={addProfileBanner}
        />
      ) : (
        <img
          className={styles.profileBanner}
          src={userData.profile_banner_url}
          alt="profile banner"
          onClick={addProfileBanner}
        />
      )}

      {showBannerUploadModal && (
        <div>
          <BannerUploadModal
            setShowBannerUploadModal={setShowBannerUploadModal}
            userData={userData}
            setUserData={setUserData}
          ></BannerUploadModal>
        </div>
      )}

      {userData.profile_picture_url === "" ? (
        <img
          className={styles.profilePicture}
          src="https://southernplasticsurgery.com.au/wp-content/uploads/2013/10/user-placeholder.png"
          alt="profile picture"
          onClick={addProfilePicture}
        />
      ) : (
        <img
          className={styles.profilePicture}
          src={userData.profile_picture_url}
          alt="profile picture"
          onClick={addProfilePicture}
        />
      )}

      {showFileUploadModal && (
        <div>
          <FileUploadModal
            setShowFileUploadModal={setShowFileUploadModal}
            userData={userData}
            setUserData={setUserData}
          ></FileUploadModal>
        </div>
      )}

      <div className="container">
        <h2 className={styles.usersName}>{userData.first_name}</h2>
        <div className={styles.greetings}>
          <p>{userData.greeting}</p>
        </div>

        <div className={styles.profileMenu}>
          <div className={styles.menuStyle}>
            <h3 onClick={handleAboutMe}>About me</h3>
            <h3 onClick={handleTales}>My tales</h3>
            {id === userCtx.userId && (
              <h3 onClick={handleCreatePost}>Pen a Tale</h3>
            )}
          </div>
        </div>
        <div className={`${styles.createFormContainer}`}>
          {aboutMe && (
            <div>
              <h1>
                {userData.first_name} {userData.last_name}
              </h1>
              <h3>{userData.gender}</h3>
              <h3>{formattedDate}</h3>
              <h3>{userData.email}</h3>

              <h3>{userData.self_description}</h3>
            </div>
          )}

          {createPostForm && (
            <div className={`container ${styles.createPostForm}`}>
              <h2 className="text-center">Write a Tale</h2>
              <h5>Give a title to your post :</h5>
              <input type="text" ref={titleRef} placeholder="Title"></input>
              <h5>Give your post a short Description</h5>
              <textarea
                type="text"
                ref={meta_descriptionRef}
                style={{ height: "250px", width: "450px" }}
              ></textarea>
              <h5>Write your Post</h5>
              <textarea
                type="text"
                ref={contentRef}
                style={{ height: "250px", width: "450px" }}
              ></textarea>
              <h5>Create a URL :</h5>
              <input type="text" ref={urlRef} placeholder="url"></input>
              <h5>Create a slug :</h5>
              <input type="text" ref={slugRef} placeholder="slug"></input>
              <h5>Create a few Tags :</h5>
              <input type="text" ref={tagsRef} placeholder="Tags"></input>
              {error && <div>{error}</div>}
              <br />
              <button onClick={createPost}>Submit</button>
            </div>
          )}
          {allTales && (
            <div>
              <TalesBanner dataId={userData._id}></TalesBanner>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
