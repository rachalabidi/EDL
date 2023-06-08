import React from "react";
import "../admin/AdminLayout.css";
import { Navbar } from "../../components/index";
import { Outlet, Navigate } from "react-router-dom";

const CfdLayout = () => {
  return (
    <div>
      <Navbar
        role="Cfd Space "
        pic="data:image/png;base64,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"
        itemOne="Dashboard"
        itemTwo=" Assign the teachers"
        pathOne="/Cfd/Dashboard"
        pathTwo="/Cfd/AssignTeachers "
      />
      <Outlet />
    </div>
  );
};

export default CfdLayout;
