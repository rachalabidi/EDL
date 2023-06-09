import React from "react";
import "../admin/AdminLayout.css";
import { Navbar } from "../../components/index";
import StudentTable from "./StudentTable";
const TeacherLayout = () => {
  const matricule = localStorage.getItem("matricule");
  const speciality = localStorage.getItem("speciality");
  const name = localStorage.getItem("auth_name");
  const lastname = localStorage.getItem("auth_lastnama");
  return (
    <div>
      <Navbar
        role="Teacher  Space "
        pic="https://media.istockphoto.com/id/1080232656/photo/female-teacher-pointing-with-finger-at-mathematical-equation-on-chalkboard-in-class.jpg?s=612x612&w=0&k=20&c=F3T62Mo1lj0n0vP44gAPDuv52h2ZrB4ggNAFdGnA2M0="
      />
      <h1>
        Hello {name} {lastname}
      </h1>
      <StudentTable />
    </div>
  );
};

export default TeacherLayout;
