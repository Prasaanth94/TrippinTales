import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./ProfileDisplay.module.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const ProfileDisplay = (props) => {
  const fetchData = useFetch();
  const [userdata, setUserData] = useState({});
  const [aboutMe, setAboutMe] = useState(false);
  const [createPostForm, setCreatePostForm] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();
  const urlRef = useRef();
  const slugRef = useRef();
  const tagsRef = useRef();
  const meta_descriptionRef = useRef();
  const userCtx = useContext(UserContext);

  const getUserInfo = async () => {
    console.log(props.userId);
    try {
      const res = await fetchData(
        "/api/users/" + props.userId,
        "GET",
        undefined,
        userCtx.Token
      );
      if (res.ok) {
        setUserData(res.data);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAboutMe = () => {
    setCreatePostForm(false);
    if (!aboutMe) {
      setAboutMe(true);
    } else if (aboutMe) {
      setAboutMe(false);
    }
  };

  const handleCreatePost = () => {
    setAboutMe(false);
    if (!createPostForm) {
      setCreatePostForm(true);
    } else if (createPostForm) {
      setCreatePostForm(false);
    }
  };

  const createPost = async () => {
    try {
      const res = await fetchData("/api/posts", "PUT", {
        title: titleRef.current.value,
        content: contentRef.current.value,
        user_id: userId,
        created_at: { type: Date, default: Date.now },
        url: urlRef.current.value,
        slug: slugRef.current.value,
        tags: tagsRef.current.value,
        images: "",
        meta_description: meta_descriptionRef,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (props.userId) {
      getUserInfo();
    }
  }, [props.userId]);

  return (
    <div className={styles.ProfileDisplay}>
      <img
        src="https://hdrphotos.com/wp-content/uploads/2021/03/Spirit-Island-4k-RGB-2.jpg"
        alt="profile banner"
        className={styles.profileBanner}
      />

      <img
        className={styles.profilePicture}
        src="../public/20240215_GA99.jpg"
        alt="profile picture"
      />
      <div className="container">
        <h2 className={styles.usersName}>{userdata.first_name}</h2>
        <div className={styles.greetings}>
          <p>
            When I was a young boy, my father took me into the city, to see a
            marching band. He said, "Son, when you grow up, would you be the
            saviour of the broken, the beaten and the damned?"
          </p>
        </div>

        <div className={styles.profileMenu}>
          <div className={styles.menuStyle}>
            <h3 onClick={handleAboutMe}>About me</h3>
            <h3>My tales</h3>
            <h3 onClick={handleCreatePost}>Pen a Tale</h3>
          </div>
        </div>
        <div className={`${styles.createFormContainer}`}>
          {aboutMe && (
            <div>
              <h1>
                {userdata.first_name} {userdata.last_name}
              </h1>
              <h3>{userdata.gender}</h3>
              <h3>{userdata.birthdate}</h3>
              <h3>{userdata.email}</h3>
              <h3>{userdata.phone}</h3>
            </div>
          )}

          {createPostForm && (
            <div className={`container ${styles.createPostForm}`}>
              <h2 className="text-center">Write a Tale</h2>
              <h5>Give a title to your post :</h5>
              <input type="text" ref={titleRef} placeholder="Title"></input>
              <h5>Give your post a short Description</h5>
              <textarea type="text" ref={meta_descriptionRef}></textarea>
              <h5>Write your Post</h5>
              <textarea type="text" ref={contentRef}></textarea>
              <h5>Create a URL :</h5>
              <input type="text" ref={urlRef} placeholder="url"></input>
              <h5>Create a slug :</h5>
              <input type="text" ref={slugRef} placeholder="slug"></input>
              <h5>Create a few Tags :</h5>
              <input type="text" ref={tagsRef} placeholder="Tags"></input>
              <br />
              <button onClick={createPost}>Submit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
