import React from "react";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { PrimaryButton } from "../../components/index";

import { FiEdit } from "react-icons/fi";
import "./list.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { RegistrationForm } from "../../layouts";

const List = () => {
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await getAllData();
  //       setData(result);
  //     };
  //     fetchData();
  //   }, []);
  const navigate = useNavigate();

  const navigateAdd = () => {
    navigate("/admin/REGISTER", { replace: true });
  };
  return (
    <div>
      <div className="grid-container-element">
        <h1 className="grid-child-element">User Table</h1>
        {/* <PrimaryButton
          type="submit"
          onClick={navigateAdd}
          className="grid-child-element"
        >
          Add Account
        </PrimaryButton> */}
        <button onClick={navigateAdd} className="add">
          {" "}
          Add Account
        </button>
      </div>
      <Routes>
        <Route path="/admin/REGISTER" element={<RegistrationForm />} />
      </Routes>
      <div className="container">
        <div className="table-wrapper">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Speciality</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>rasha labidi</td>
                <td>rasha@mail.com</td>
                <td>gl</td>
                <td>Student</td>
                <td>
                  <FiEdit className="icon" />
                  <AiOutlineDelete className="icon" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
