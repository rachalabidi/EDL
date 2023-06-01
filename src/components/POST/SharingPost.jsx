import React, { useState } from "react";
import axios from "axios";
import "./sharing.css";
import "../../assets/style/input.css";
import { FaUpload } from "react-icons/fa";
import PostContainer from "./PostContainer";

const SharingPost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    photo: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setPost((prevState) => ({
      ...prevState,
      photo: imageFile,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    if (post.photo) {
      formData.append("photo", post.photo);
    }
    console.log(formData);
    console.log("ki hna");
    try {
      const response = await axios.post("/api/importInfo", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type for file uploads
        },
      });
      console.log(response.data);
      // Reset form after successful submission
      setPost({
        title: "",
        description: "",
        photo: null,
      });
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="share-post-container">
        <form className="share-post-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              className="text-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="description">Post:</label>
            <textarea
              id="description"
              name="description"
              value={post.description}
              onChange={handleInputChange}
              className="text-input textarea-input"
              rows={5}
            ></textarea>
          </div>
          <div>
            <label htmlFor="photo">Image:</label>
            <div className="image-input-wrapper">
              <label htmlFor="photo" className="image-input-label">
                <FaUpload className="upload-icon" />
                Choose File
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {post.photo && (
                <img
                  className="image-preview"
                  src={URL.createObjectURL(post.photo)}
                  alt="Preview"
                />
              )}
            </div>
          </div>
          <button type="submit">Share</button>
        </form>
      </div>
      <h1> Posts </h1>
      <PostContainer />
    </div>
  );
};

export default SharingPost;
