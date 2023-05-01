import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { BsSearch, BsFillMenuAppFill } from "react-icons/bs";
import { MdOutlineNotificationsNone } from "react-icons/md";

const Navbar = (props) => {
  return (
    <div id="content">
      <nav>
        <Link to="#" className="logo">
          <img
            src="https://www.univ-constantine2.dz/facntic/wp-content/uploads/2022/01/Logo-NTIC-zizette-boufaida-1.png"
            alt="logo"
          />
        </Link>
        <a to="#" className="nav-Link">
          {props.role}
        </a>
        <form action="#">
          <div className="form-input">
            <input type="text" placeholder="Search..." />
            <button type="submit" className="search-btn">
              {/* <i className="bx bx-search"></i> */}
              <BsSearch className="input-icon uil uil-at " />
            </button>
          </div>
        </form>
        <Link to={props.pathOne} className="nav-Link">
          {props.itemOne}
        </Link>
        <Link to={props.pathTwo} className="nav-Link">
          {props.itemTwo}
        </Link>
        <Link to="/" className="nav-Link b">
          Log out
        </Link>

        <a to="#" className="notification" />

        <MdOutlineNotificationsNone className="input-icon uil uil-at " />

        <Link to="#" className="profile">
          <img src={props.pic} alt="profile" />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
