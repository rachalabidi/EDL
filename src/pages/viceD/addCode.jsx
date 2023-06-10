import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import "./viced";

const AddCode = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  // const generateAnonymityCodes = async () => {
  //   try {
  //     const updatedStudents = students.map((student) => {
  //       let randomCode = Math.random().toString(36).substr(2, 8).toUpperCase();

  //       // Check if the generated code already exists for any other student
  //       while (students.some((s) => s.code_an === randomCode)) {
  //         randomCode = Math.random().toString(36).substr(2, 8).toUpperCase();
  //       }

  //       return { ...student, code_an: randomCode };
  //     });
  //     setStudents(updatedStudents);

  //     // Update the codes in the database for all students
  //     await axios.put("/api/code_an", {
  //       students: updatedStudents,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const generateAnonymityCodes = async () => {
    try {
      const response = await axios.post("/api/code_an");
      console.log(response.data.message);

      // Fetch the updated student data
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const buttonStyles = {
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "var(--primary-color)",
    padding: "12px 30px",
    display: "inline-block",
    borderRadius: "4px",
    fontWeight: 400,
    letterSpacing: "0.5px",
    transition: "all 0.3s",
    position: "relative",
    overflow: "hidden",
    textTransform: "uppercase",
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <button
          style={buttonStyles}
          type="button"
          onClick={generateAnonymityCodes}
        >
          Generate Anonymity Code
        </button>
      </div>
      <div className="container">
        <div className="table-wrapper">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Present</th>
                <th>Anonymity Code</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((data) => (
                  <tr key={data.user_id}>
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td> {data.present ? "Present" : "Absent"}</td>
                    <td>{data.code_an}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddCode;
