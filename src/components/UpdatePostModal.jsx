import React, { useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./UpdatePostModal.module.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const OverLay = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const titleRef = useRef("");
  const contentRef = useRef("");
  const tagsRef = useRef("");
  const imagesRef = useRef("");
  const metaDescriptionRef = useRef("");

  const updatePost = async (id) => {
    const confirmUpdate = confirm("Are you sure you want to update this post?");

    if (!confirmUpdate) {
      return; // Do nothing if user cancels
    }

    const res = await fetchData(
      `/api/posts/${id}`,
      "PATCH",
      {
        title: titleRef.current.value,
        content: contentRef.current.value,
        tags: tagsRef.current.value,
        images: imagesRef.current.value,
        meta_description: metaDescriptionRef.current.value,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      props.getPostById();
      props.setShowPostUpdateModal(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    titleRef.current.value = props.title;
    contentRef.current.value = props.content;
    tagsRef.current.value = props.tags;
    imagesRef.current.value = props.images;
    metaDescriptionRef.current.value = props.metaDescription;
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <br />
        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Title</div>
          <input ref={titleRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Content</div>
          <input ref={contentRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Tags</div>
          <input ref={tagsRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Images</div>
          <input ref={imagesRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Meta Description</div>
          <input ref={metaDescriptionRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <button onClick={() => updatePost(props.id)} className="col-md-3">
            update
          </button>
          <button
            onClick={() => props.setShowPostUpdateModal(false)}
            className="col-md-3"
          >
            cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          title={props.title}
          content={props.content}
          tags={props.tags}
          images={props.images}
          metaDescription={props.metaDescription}
          setShowPostUpdateModal={props.setShowPostUpdateModal}
          getPostById={props.getPostById}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
