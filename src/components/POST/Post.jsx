import React from "react";
import "./post.css";
import { FaTrash, FaEdit } from "react-icons/fa";

const Post = (props) => {
  return (
    <div className="post">
      <h3 className="post-title">{props.title} </h3>
      <p className="post-description">{props.description}</p>
      <img
        src={`http://localhost:8000/storage/${props.photo}`}
        alt={props.photo}
        className="post-photo"
      />
      <div className="post-actions">
        <button className="post-icon" onClick={props.onDelete}>
          <FaTrash />
        </button>
        <button className="post-icon" onClick={props.onEdit}>
          <FaEdit />
        </button>
      </div>
    </div>
  );
};
const PostView = (props) => {
  return (
    <div className="post">
      <h3 className="post-title">{props.title} </h3>
      <p className="post-description">{props.description}</p>
      <img
        src={`http://localhost:8000/storage/${props.photo}`}
        alt={props.photo}
        className="post-photo"
      />
    </div>
  );
};

export default Post;
export { PostView };
