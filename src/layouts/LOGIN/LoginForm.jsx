import React, { useState } from "react";
import "./LoginForm.css";
import "../../assets/style/input.css";
import { BsFillPersonFill, BsLockFill } from "react-icons/bs";
import { PrimaryButton } from "../../components/index";
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <div className="log-in-form">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-body">
          <h1>Log In</h1>
          <div className="form-group">
            <BsFillPersonFill className="input-icon uil uil-at" />
            <input
              className="form-style"
              type="text"
              value={username}
              placeholder="Your ID"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <br />
          <div className="form-group mt-2">
            <BsLockFill className="input-icon uil uil-lock-alt" />
            <input
              className="form-style"
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <br />
          <PrimaryButton className="btn">Log in</PrimaryButton>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
