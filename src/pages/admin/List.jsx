import React from "react";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { PrimaryButton } from "../../components/index";

import { FiEdit } from "react-icons/fi";
import "./list.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { RegistrationForm } from "../../layouts";
import CsvRegister from "../../layouts/creationAcc/CsvRegister";
import axios from "axios";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import withReactContent from "sweetalert2-react-content";
import "../../assets/style/sweetalert-custom.css";
const List = () => {
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/users");
      setDataList(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        customClass: {
          popup: "custom-swal-popup",
        },
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/supprimer/${userId}`);
        fetchData(); // Refresh data after successful deletion

        MySwal.fire("Deleted!", "The user has been deleted.", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE operation
  const updateItem = async (itemId, data) => {
    try {
      const response = await axios.put(`/api/modifier/${itemId}`, data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const navigateAdd = () => {
    navigate("/admin/REGISTER", { replace: true });
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDataList = dataList.filter((data) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    const role = data.role.toLowerCase();
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.includes(searchTerm.toLowerCase())
    );
  });
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
          Add Account
        </button>
      </div>
      <h3>or</h3>

      <CsvRegister className="upload" />

      <Routes>
        <Route path="/admin/REGISTER" element={<RegistrationForm />} />
      </Routes>
      {/* Add the search bar */}
      <div className="container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by role..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
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
              {filteredDataList.length > 0 ? (
                filteredDataList.map((data) => (
                  <tr key={data.id}>
                    <td>
                      {data.firstName} {data.lastName}
                    </td>
                    <td>{data.email}</td>
                    <td>{data.speciality}</td>
                    <td>{data.role}</td>
                    <td>
                      <FiEdit
                        className="icon"
                        onClick={() => updateItem(data.id)}
                      />
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDelete(data.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
