import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import ReportedPost from "../components/ReportedPost";

const AdminPage = () => {
  const userCtx = useContext(UserContext);
  const [reportedPosts, setReportedPosts] = useState([]);
  const fetchData = useFetch();

  const getReportedPosts = async () => {
    const res = await fetchData(
      "/api/posts",
      undefined,
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setReportedPosts(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const deleteReportedPost = async (id) => {
    const res = await fetchData(
      "/api/posts/" + id,
      "DELETE",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      getReportedPosts();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getReportedPosts();
  }, []);

  return (
    <div>
      <h1 className="col-md-4">Admin Console</h1>

      {reportedPosts.map((item) => {
        return (
          <ReportedPost
            key={item._id}
            id={item._id}
            title={item.title}
            content={item.content}
            images={item.images}
            userId={item.user_id}
            createdAt={item.created_at}
            reportedPosts={reportedPosts}
            deleteReportedPost={deleteReportedPost}
          />
        );
      })}
    </div>
  );
};

export default AdminPage;
