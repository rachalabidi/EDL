import React from "react";
import "./Box.css";
import BoxInfo from "../BoxInfo/BoxInfo";

import { FiUsers } from "react-icons/fi";

const Box = () => {
  return (
    <ul className="box-info">
      <BoxInfo
        icon={<FiUsers className="bx" />}
        number="8888"
        title="STUDENT"
      />
      <BoxInfo
        icon={<FiUsers className="bx" />}
        number="34343"
        title="TEACHER"
      />
      <BoxInfo icon={<FiUsers className="bx" />} number="343" title="ASSQSQ" />
    </ul>
  );
};

export default Box;
