import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { BsSearch, BsFillMenuAppFill } from "react-icons/bs";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { PrimaryButton } from "../index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Navbar = (props) => {
  const navigateTo = useNavigate();
  const logoutSubmit = (e) => {
    e.preventDefault();
    console.log("working");
    try {
      axios.post(`/api/logout`).then((res) => {
        if (res.data.status === 200) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_name");
          swal("success", "log out  ", "success");
          navigateTo("/");
        }
      });
    } catch (error) {
      console.error(error.res.data);
      swal("Error", "Something went wrong. Please try again later.", "error");
    }
  };

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
        <Link to={props.path3} className="nav-Link">
          {props.item3}
        </Link>
        <button type="button" onClick={logoutSubmit} className="nav-Link b">
          Log out
        </button>

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
