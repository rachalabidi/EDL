import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

import "./LoginForm.css";
import "../../assets/style/input.css";
import { BsFillPersonFill, BsLockFill } from "react-icons/bs";
import { PrimaryButton } from "../../components/index";
import { useNavigate } from "react-router-dom";
import "../../assets/style/sweetalert-custom.css";

function LoginForm() {
  const navigateTo = useNavigate();

  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    try {
      axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post(`/api/login`, JSON.stringify(data)).then((res) => {
          console.log("here it works 22");
          console.log(res);

          if (res.data.status === 200) {
            localStorage.setItem("auth_token", res.data.token);
            localStorage.setItem("auth_name", res.data.username);
            localStorage.setItem("auth_lastnama", res.data.userlastname);
            localStorage.setItem("matricule", res.data.matricule);
            localStorage.setItem("speciality", res.data.speciality);
            console.log(res.data.role);

            switch (res.data.role) {
              case "admin":
                navigateTo("/admin/dashboard");
                break;
              case "student":
                navigateTo("/Student");
                break;
              case "cfd":
                navigateTo("/Cfd/Dashboard");
                break;
              case "teacher":
                navigateTo("/Teacher");
                break;
              case "vice":
                navigateTo("/ViceD/SharingPost");
                break;
              default:
            }
          } else if (res.data.status === 401) {
            console.log("here it works 4");

            swal({
              title: "Warning",
              text: "wrong pass or email",
              icon: "warning",
              customClass: "my-swal",
            });
          } else {
            setLogin({
              ...loginInput,
              error_list: res.data.validation_errors,
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
    <div className="log-in-form">
      <div className="form-container">
        <form onSubmit={loginSubmit} className="form-body">
          {/* <form className="form-body"> */}
          <h1>Log In</h1>
          <div className="form-group">
            <BsFillPersonFill className="input-icon uil uil-at" />
            <input
              className="form-style"
              type="email"
              name="email"
              onChange={handleInput}
              value={loginInput.email}
              placeholder="Email"
            />
            <span>{loginInput.error_list.email}</span>
          </div>
          <br />
          <div className="form-group mt-2">
            <BsLockFill className="input-icon uil uil-lock-alt" />
            <input
              className="form-style"
              type="password"
              placeholder="Your Password"
              name="password"
              onChange={handleInput}
              value={loginInput.password}
            />
            <span>{loginInput.error_list.password}</span>
          </div>
          <br />
          <PrimaryButton type="submit" className="btn">
            log in
          </PrimaryButton>

          {/* <button className="btn" type="submit">
            log in
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
