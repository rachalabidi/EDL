import React from "react";
import "./post.css";
import { useEffect, useState } from "react";

import axios from "axios";
import { PostView } from "./Post";

const PostContainerView = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/infoPartager");
      setPosts(response.data.photos);
      console.log(response.data.photos);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="post_con">
      {posts.map((post) => (
        <PostView
          key={post.id}
          title={post.title}
          description={post.description}
          photo={`/storage/${post.path}`}
        />
      ))}
    </div>
  );
};

export default PostContainerView;
