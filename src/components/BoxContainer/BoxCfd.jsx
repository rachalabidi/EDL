import React from "react";
import "./Box.css";
import BoxInfo from "../BoxInfo/BoxInfo";

import { GoMortarBoard } from "react-icons/go";

const BoxCfd = () => {
  return (
    <ul className="box-info">
      <BoxInfo
        icon={<GoMortarBoard className="bx" />}
        number="Software Engineering"
        title="STUDENT"
      />
      <BoxInfo
        icon={<GoMortarBoard className="bx" />}
        number="Information and Communication S. and T."
        title="TEACHER"
      />
      <BoxInfo
        icon={<GoMortarBoard className="bx" />}
        number="Information S. and Web T."
        title="ASSQSQ"
      />
      <BoxInfo
        icon={<GoMortarBoard className="bx" />}
        number="Networks and distributed systems"
        title="ASSQSQ"
      />
      <BoxInfo
        icon={<GoMortarBoard className="bx" />}
        number="common core"
        title="ASSQSQ"
      />
    </ul>
  );
};

export default BoxCfd;
