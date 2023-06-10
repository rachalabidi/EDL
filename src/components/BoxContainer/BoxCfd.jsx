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
            title="4"
          />
        </Link>
        <Link to="/Cfd/Dashboard/stic">
          <BoxInfo
            icon={<GoMortarBoard className="bx" />}
            number="Information and Communication S. and T."
            title="2"
          />
        </Link>
        <Link to="/Cfd/Dashboard/stiw">
          <BoxInfo
            icon={<GoMortarBoard className="bx" />}
            number="Information S. and Web T."
            title="1"
          />
        </Link>
        <Link to="/Cfd/Dashboard/rsd">
          <BoxInfo
            icon={<GoMortarBoard className="bx" />}
            number="Networks and distributed systems"
            title="2"
          />
        </Link>
        <Link to="/Cfd/Dashboard/tr">
          <BoxInfo
            icon={<GoMortarBoard className="bx" />}
            number="common core"
            title="9"
          />
        </Link>
      </ul>
    </div>
  );
};

export default BoxCfd;
