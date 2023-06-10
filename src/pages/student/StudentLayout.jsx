import React from "react";
import "../admin/AdminLayout.css";
import { Navbar } from "../../components/index";
import { Outlet, Navigate } from "react-router-dom";

import PostContainerView from "../../components/POST/PostContainerView";
const StudentLayout = () => {
  const name = localStorage.getItem("auth_name");
  const lastname = localStorage.getItem("auth_lastnama");
  return (
    <div>
      <Navbar
        role="Student  Space "
        pic="https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg"
        itemOne="Dashboard"
        itemTwo="See Results"
        pathOne="/Student/Dashboard "
        pathTwo="/Student/Results "
      />
      <h1>
        Hello {name} {lastname}
      </h1>
      <Outlet />
      {/* <PostContainerView /> */}
    </div>
  );
};

export default StudentLayout;
