import "./Box.css";
import BoxInfo from "../BoxInfo/BoxInfo";

import { Routes, Route, Link } from "react-router-dom";

import TablePage from "../../pages/cfd/TablePage";
import { GoMortarBoard } from "react-icons/go";

const BoxCfd = () => {
  return (
    <div>
      <ul className="box-info">
        <Link to="/Cfd/Dashboard/gl">
          <BoxInfo
            icon={<GoMortarBoard className="bx" />}
            number="Software Engineering"
            title="STUDENT"
          />
        </Link>
        <Link to="/Cfd/Dashboard/stic">
          <BoxInfo
            icon={<GoMortarBoard className="bx" />}
            number="Information and Communication S. and T."
            title="TEACHER"
          />
        </Link>
        <Link to="/Cfd/Dashboard/stiw">
          <BoxInfo
            icon={<GoMortarBoard className="bx" />}
            number="Information S. and Web T."
            title="ASSQSQ"
          />
        </Link>
        <Link to="/Cfd/Dashboard/rsd">
          <BoxInfo
            icon={<GoMortarBoard className="bx" />}
            number="Networks and distributed systems"
            title="ASSQSQ"
          />
        </Link>
        <Link to="/Cfd/Dashboard/tr">
          <BoxInfo
            icon={<GoMortarBoard className="bx" />}
            number="common core"
            title="ASSQSQ"
          />
        </Link>
      </ul>
    </div>
  );
};

export default BoxCfd;
