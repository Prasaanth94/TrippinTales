import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import ReportedPost from "../components/ReportedPost";

const AdminPage = () => {
  const userCtx = useContext(UserContext);
  const [reportedPosts, setReportedPosts] = useState([]);
  const [usernames, setUsernames] = useState({});
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
      fetchUsernames(res.data);
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

  const fetchUsernames = async (posts) => {
    const userIds = posts.map((post) => post.user_id);
    const uniqueUserIds = [...new Set(userIds)]; // Remove duplicate user IDs
    const usernameMap = {};

    for (const userId of uniqueUserIds) {
      const userRes = await fetchData(
        `/api/users/${userId}`, // Assuming this is the endpoint to fetch user details by ID
        "GET",
        undefined,
        userCtx.accessToken
      );

      if (userRes.ok) {
        usernameMap[userId] = userRes.data.username;
      } else {
        console.error(`Failed to fetch username for user ID: ${userId}`);
      }
    }

    setUsernames(usernameMap);
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
            username={usernames[item.user_id]}
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
