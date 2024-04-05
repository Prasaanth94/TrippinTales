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

  useEffect(() => {
    getReportedPosts();
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      {reportedPosts.map((item) => {
        return <ReportedPost></ReportedPost>;
      })}
    </div>
  );
};

export default AdminPage;
