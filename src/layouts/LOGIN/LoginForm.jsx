import React, { useState } from "react";
// import axios from "axios";
// import swal from "sweetalert";
// import { useHistory } from "react-router-dom";
import "./LoginForm.css";
import "../../assets/style/input.css";
import { BsFillPersonFill, BsLockFill } from "react-icons/bs";
import { PrimaryButton } from "../../components/index";
function LoginForm() {
  // const history = useHistory();
  // const [loginInput, setLogin] = useState({
  //   email: "",
  //   password: "",
  //   error_list: [],
  // });

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(`Username: ${username}\nPassword: ${password}`);
  // };
  // const handleInput = (e) => {
  //   e.persist();
  //   setLogin({ ...loginInput, [e.target.name]: e.target.value });
  // };

  // const loginSubmit = (e) => {
  //   e.preventDefault();

  // const data = {
  //   email: loginInput.email,
  //   password: loginInput.password,
  // };

  //   axios.get("/sanctum/csrf-cookie").then((response) => {
  //     axios.post(`api/login`, data).then((res) => {
  //       if (res.data.status === 200) {
  //         localStorage.setItem("auth_token", res.data.token);
  //         localStorage.setItem("auth_name", res.data.username);
  //         swal("Success", res.data.message, "success");
  //         if (res.data.role === "admin") {
  //           history.push("/admin/dashboard");
  //         } else {
  //           history.push("/dashboard");
  //         }
  //       } else if (res.data.status === 401) {
  //         swal("Warning", res.data.message, "warning");
  //       } else {
  //         setLogin({ ...loginInput, error_list: res.data.validation_errors });
  //       }
  //     });
  //   });
  // };

  return (
    <div className="log-in-form">
      <div className="form-container">
        {/* <form onSubmit={handleSubmit} className="form-body"> */}
        <form className="form-body">
          <h1>Log In</h1>
          <div className="form-group">
            <BsFillPersonFill className="input-icon uil uil-at" />
            <input
              className="form-style"
              type="email"
              name="email"
              // onChange={handleInput}
              // value={loginInput.email}
              placeholder="Email"
            />
            {/* <span>{loginInput.error_list.email}</span> */}
          </div>
          <br />
          <div className="form-group mt-2">
            <BsLockFill className="input-icon uil uil-lock-alt" />
            <input
              className="form-style"
              type="password"
              placeholder="Your Password"
              name="password"
              // onChange={handleInput}
              // value={loginInput.password}
            />
            {/* <span>{loginInput.error_list.password}</span> */}
          </div>
          <br />
          <PrimaryButton className="btn">Log in</PrimaryButton>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
