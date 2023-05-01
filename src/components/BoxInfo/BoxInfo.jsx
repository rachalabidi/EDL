import React from "react";
import "./BoxInfo.css";
import { FiUsers } from "react-icons/fi";

const BoxInfo = (props) => {
  return (
    <div>
      <li>
        {props.icon}
        <span className="text">
          <h3>{props.number}</h3>
          <p>{props.title}</p>
        </span>
      </li>
    </div>
  );
};

export default BoxInfo;
