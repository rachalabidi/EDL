import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import withReactContent from "sweetalert2-react-content";

// ICONS AND BUTTONS
import { AiOutlineDelete } from "react-icons/ai";
import { PrimaryButton } from "../../components/index";
import { FiEdit } from "react-icons/fi";

// STYLE
import "./list.css";
import "../../assets/style/sweetalert-custom.css";

//COMPONENTS
import { RegistrationForm } from "../../layouts";
import CsvRegister from "../../layouts/creationAcc/CsvRegister";
import SearchBar from "./SearchBar";

import axios from "axios";

const List = () => {
  const [dataList, setDataList] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [filteredDataList, setFilteredDataList] = useState([]);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/users");
      setDataList(response.data.users);
      setFilteredDataList(response.data.users);
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

  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
  });
  const handleModify = async (itemId) => {
    try {
      const result = await Swal.fire({
        title: "Modify User",
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="First Name" value="' +
          userInput.firstName +
          '">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Last Name" value="' +
          userInput.lastName +
          '">',
        showCancelButton: true,
        confirmButtonText: "Save",
        customClass: {
          popup: "custom-swal-popup",
          confirmButton: "custom-swal-confirm-button",
          cancelButton: "custom-swal-cancel-button",
          input: "custom-swal-input",
        },
        preConfirm: () => {
          const firstName = Swal.getPopup().querySelector("#swal-input1").value;
          const lastName = Swal.getPopup().querySelector("#swal-input2").value;
          return { firstName, lastName };
        },
      });

      if (result.isConfirmed) {
        const { firstName, lastName } = result.value;

        const data = {
          firstName: firstName,
          lastName: lastName,
        };

        try {
          const response = await axios.put(`/api/modifier/${itemId}`, data);
          console.log(response.data);

          Swal.fire({
            title: "Success",
            text: "User modified successfully!",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            fetchData();
          });
        } catch (error) {
          console.log(error);

          Swal.fire({
            title: "Error",
            text: "Failed to modify user",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            // Perform any additional actions after the alert is closed
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const navigateAdd = () => {
    navigate("/admin/REGISTER", { replace: true });
  };
  const handleSearch = (query) => {
    const filteredList = dataList.filter((data) =>
      data.role.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDataList(filteredList);
  };

  return (
    <div>
      <div className="grid-container-element">
        <h1 className="grid-child-element">User Table</h1>
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
        <SearchBar handleSearch={handleSearch} />
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
                        onClick={() => handleModify(data.id)}
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
