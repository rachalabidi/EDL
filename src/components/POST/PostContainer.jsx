import React from "react";
import "./post.css";
import { useEffect, useState } from "react";

import axios from "axios";
import Post, { PostView } from "./Post";
import Swal from "sweetalert2";

const PostContainer = () => {
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
  const deletePost = async (postId) => {
    try {
      await axios.delete(`api/deleteInfoPartager/${postId}`);
      fetchPosts();
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };
  const [post, setPost] = useState({
    title: "",
    description: "",
    photo: "",
  });

  const handleModifyPost = async (postId) => {
    console.log("works here ashahsi");
    console.log(postId);
    try {
      const result = await Swal.fire({
        title: "Modify Post",
        html:
          '<input id="swal-input-title" class="swal2-input" placeholder="Title" value="' +
          post.title +
          '">' +
          '<textarea id="swal-input-description" class="swal2-input" placeholder="Description">' +
          post.description +
          "</textarea>" +
          '<div class="custom-swal-file-input">' +
          '<input id="swal-input-photo" class="swal2-input" class="swal2-input" type="file" accept="image/*" src="http://localhost:8000/storage/' +
          post.photo +
          '">' +
          "</div>",
        showCancelButton: true,
        confirmButtonText: "Save",
        customClass: {
          popup: "custom-swal-popup",
          confirmButton: "custom-swal-confirm-button",
          cancelButton: "custom-swal-cancel-button",
          input: "custom-swal-input",
        },
        preConfirm: () => {
          const title =
            Swal.getPopup().querySelector("#swal-input-title").value;
          const description = Swal.getPopup().querySelector(
            "#swal-input-description"
          ).value;
          const photo =
            Swal.getPopup().querySelector("#swal-input-photo").value;
          return { title, description, photo };
        },
      });

      if (result.isConfirmed) {
        const { title, description, photo } = result.value;

        const updatedData = {
          title: title,
          description: description,
          photo: photo,
        };

        try {
          const response = await axios.put(
            `/api/updateInfoPartager/${postId}`,
            updatedData
          );
          console.log(response.data);

          Swal.fire({
            title: "Success",
            text: "Post modified successfully!",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            fetchPosts();
          });
        } catch (error) {
          console.log(error);

          Swal.fire({
            title: "Error",
            text: "Failed to modify post",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            // Perform any additional actions after the alert is closed
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post_con">
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          description={post.description}
          photo={post.path}
          onDelete={() => deletePost(post.id)}
          onEdit={() => handleModifyPost(post.id)}
        />
      ))}
    </div>
  );
};

export default PostContainer;
