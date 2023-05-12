import React from "react";
import "../admin/AdminLayout.css";
import { Navbar } from "../../components/index";
import PostContainerView from "../../components/POST/PostContainerView";
const StudentLayout = () => {
  const name = localStorage.getItem("auth_name");
  const lastname = localStorage.getItem("auth_lastnama");
  return (
    <div>
      <Navbar
        role="Student  Space "
        pic="https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg"
        itemOne={name}
        itemTwo={lastname}
      />
      <h1>
        Hello {name} {lastname}
      </h1>

      <PostContainerView />
    </div>
  );
};

export default StudentLayout;
