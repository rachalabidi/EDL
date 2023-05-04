import React, { useState } from "react";
import "./regis.css";
import "../LOGIN/LoginForm.css";
import { PrimaryButton } from "../../components/index";
// import "../LOGIN/LoginForm.css";
import "./regis.css";
import "../../assets/style/input.css";
import Select from "react-select";
import { wilayaOptions } from "../../data/wilayaOptions";
import { Role } from "../../data/Role";
import { Speciality } from "../../data/speciality";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigateTo = useNavigate();

  const [registerInput, setRegister] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    birthday: "",
    placeOfBirth: "",
    address: "",
    speciality: "",
    wilayaOfBirth: "",
    matricule: "",
    role: "",
    error_list: [],
  });

  const handleInput = (event) => {
    event.persist();
    event.preventDefault();
    const { name, value } = event.target;

    setRegister({
      ...registerInput,
      [name]: value,
    });
    // }
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: registerInput.email,
      firstName: registerInput.firstName,
      lastName: registerInput.lastName,
      password: registerInput.password,
      birthday: registerInput.birthday,
      placeOfBirth: registerInput.placeOfBirth,
      address: registerInput.address,
      speciality: registerInput.speciality,
      wilayaOfBirth: registerInput.wilayaOfBirth,
      matricule: registerInput.matricule,
      role: registerInput.role,
    };
    console.log("here it works");
    console.log(data);
    try {
      axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post(`/api/register`, JSON.stringify(data)).then((res) => {
          console.log("here it works 22");
          console.log(res);

          if (res.status === 200) {
            localStorage.setItem("auth_token", res.data.access_token);
            localStorage.setItem("auth_username", res.data.username);
            console.log("here it works 3");
            swal("success", "well added", "success");

            navigateTo("/admin/dashboard");
          } else {
            setRegister({
              ...registerInput,
              error_list: res.data.errors,
            });
          }
        });
      });
    } catch (error) {
      console.error(error.res.data);
      swal("Error", "Something went wrong. Please try again later.", "error");
    }
  };

  return (
    <div className="cr-form">
      <div className="form-container">
        <form onSubmit={registerSubmit} className="form-body">
          <h1>Create Account</h1>
          <div className="form-group">
            {/* <BsFillPersonFill className="input-icon uil uil-at" /> */}
            <input
              className="form-style"
              type=""
              name="email"
              onChange={handleInput}
              value={registerInput.email}
              placeholder="Email"
            />
            <span>{registerInput.error_list.email}</span>
          </div>
          <br />
          <div className="form-group">
            {/* <BsFillPersonFill className="input-icon uil uil-at" /> */}
            <input
              className="form-style"
              type="text"
              name="firstName"
              onChange={handleInput}
              value={registerInput.firstName}
              placeholder="First Name"
            />
            <span>{registerInput.error_list.firstName}</span>
          </div>
          <br />
          <div className="form-group">
            {/* <BsFillPersonFill className="input-icon uil uil-at" /> */}
            <input
              className="form-style"
              type="TEXT"
              name="lastName"
              onChange={handleInput}
              value={registerInput.lastName}
              placeholder="Last Name"
            />
            <span>{registerInput.error_list.lastName}</span>
          </div>
          <br />
          <div className="form-group">
            {/* <BsFillPersonFill className="input-icon uil uil-at" /> */}
            <input
              className="form-style"
              type="password"
              name="password"
              onChange={handleInput}
              value={registerInput.password}
              placeholder="Password"
            />
            <span>{registerInput.error_list.password}</span>
          </div>
          <br />
          <div className="form-group">
            {/* <BsFillPersonFill className="input-icon uil uil-at" /> */}
            <input
              className="form-style"
              type="date"
              name="birthday"
              onChange={handleInput}
              value={registerInput.birthday}
            />
            <span>{registerInput.error_list.birthday}</span>
          </div>
          <br />
          {/* <div className="form-group">
            <Select
              styles={{
                color: "#FFF",
                fontSize: "20px",
                control: (styles) => ({
                  ...styles,
                  backgroundColor: "#1f20296f",
                  borderColor: "#1f20296f",
                }),
                option: (base) => ({
                  ...base,
                  cursor: "pointer",
                  background: "#1f20296f",
                  color: "white",
                  ":hover": {
                    backgroundColor: "rgb(200, 200, 200)",
                    color: " black",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  background: "#1f20296f",
                  width: "max-content",
                }),
              }}
              className="form-style"
              name="wilayaOfBirth"
              onChange={(wilaya) =>
                setRegister({
                  ...registerInput,
                  wilayaOfBirth: wilaya,
                })
              }
              value={registerInput.wilayaOfBirth}
              placeholder="Wilaya Of Birth"
              options={wilayaOptions}
            />
            <span>{registerInput.error_list.wilayaOfBirth}</span>
          </div> */}
          <div className="form-group">
            <input
              className="form-style"
              type="text"
              name="wilayaOfBirth"
              onChange={handleInput}
              value={registerInput.wilayaOfBirth}
              placeholder="wilayaOfBirth"
            />
            <span>{registerInput.error_list.wilayaOfBirth}</span>
          </div>
          <br />
          <div className="form-group">
            <input
              className="form-style"
              type="text"
              name="placeOfBirth"
              onChange={handleInput}
              value={registerInput.placeOfBirth}
              placeholder="Place Of Birth"
            />
            <span>{registerInput.error_list.placeOfBirth}</span>
          </div>
          <br />
          <div className="form-group">
            {/* <BsFillPersonFill className="input-icon uil uil-at" /> */}
            <input
              className="form-style"
              type="text"
              name="matricule"
              onChange={handleInput}
              value={registerInput.matricule}
              placeholder="ID"
            />
            <span>{registerInput.error_list.matricule}</span>
          </div>
          <br />

          <div className="form-group">
            {/* <BsFillPersonFill className="input-icon uil uil-at" /> */}
            <input
              className="form-style"
              type="text"
              name="address"
              onChange={handleInput}
              value={registerInput.address}
              placeholder="Address"
            />
            <span>{registerInput.error_list.address}</span>
          </div>
          <br />
          <div className="form-group">
            {/* <BsFillPersonFill className="input-icon uil uil-at" /> */}
            <input
              className="form-style"
              type="text"
              name="speciality"
              onChange={handleInput}
              value={registerInput.speciality}
              placeholder="speciality"
            />
            <span>{registerInput.error_list.matricule}</span>
          </div>
          {/* <div className="form-group">
            <Select
              styles={{
                color: "#FFF",
                fontSize: "20px",
                control: (styles) => ({
                  ...styles,
                  backgroundColor: "#1f20296f",
                  borderColor: "#1f20296f",
                }),
                option: (base) => ({
                  ...base,
                  cursor: "pointer",
                  background: "#1f20296f",
                  color: "white",
                  ":hover": {
                    backgroundColor: "rgb(200, 200, 200)",
                    color: " black",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  background: "#1f20296f",
                  width: "max-content",
                }),
              }}
              className="form-style"
              name="speciality"
              onChange={(sp) =>
                setRegister({
                  ...registerInput,
                  speciality: sp,
                })
              }
              value={registerInput.speciality}
              placeholder="Speciality"
              options={Speciality}
            />
            <span>{registerInput.error_list.speciality}</span>
          </div> */}
          <br />
          <br />
          {/* <div className="form-group">
            <Select
              styles={{
                color: "#FFF",
                fontSize: "20px",
                control: (styles) => ({
                  ...styles,
                  backgroundColor: "#1f20296f",
                  borderColor: "#1f20296f",
                }),
                option: (base) => ({
                  ...base,
                  cursor: "pointer",
                  background: "#1f20296f",
                  color: "white",
                  ":hover": {
                    backgroundColor: "rgb(200, 200, 200)",
                    color: " black",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  background: "#1f20296f",
                  width: "max-content",
                }),
              }}
              className="form-style"
              name="role"
              onChange={(role) =>
                setRegister({
                  ...registerInput,
                  role: role,
                })
              }
              value={registerInput.role}
              placeholder="Account Type"
              options={Role}
            />
            <span>{registerInput.error_list.role}</span>
          </div> */}
          <div className="form-group">
            <input
              className="form-style"
              type="text"
              name="role"
              onChange={handleInput}
              value={registerInput.role}
              placeholder="role"
            />
            <span>{registerInput.error_list.role}</span>
          </div>
          <br />
          <PrimaryButton className="btn" type="submit">
            ADD
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
