import React, { useEffect, useState } from "react";
import axios from "axios";

const Assign = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedTeacherDetails, setSelectedTeacherDetails] = useState([]);
  const [disableDropdowns, setDisableDropdowns] = useState(false); // New state variable

  useEffect(() => {
    // Fetch data from the database using Axios
    axios
      .get("/api/teachers")
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTeacherChange = (index, selectedTeacher) => {
    const updatedTeachers = [...selectedTeachers];
    updatedTeachers[index] = selectedTeacher;
    setSelectedTeachers(updatedTeachers);

    const teacherDetails = teachers.find(
      (teacher) => teacher.matricule === selectedTeacher
    );
    const updatedTeacherDetails = [...selectedTeacherDetails];
    updatedTeacherDetails[index] = teacherDetails;
    setSelectedTeacherDetails(updatedTeacherDetails);
  };

  const handleButtonClick = () => {
    insertModule();
    handleSave();
    setDisableDropdowns(true); // Disable the dropdowns after clicking the button
  };

  const handleSave = () => {
    console.log(selectedTeachers);
    const moduleNames = [
      "gl",
      "gl",
      "stiw",
      "stiw",
      "stic",
      "stic",
      "rsd",
      "rsd",
      "gl",
      "gl",
    ];

    // Perform the save operation for all selected teachers
    selectedTeachers.forEach((selectedTeacher, index) => {
      console.log("Index:", index);
      console.log("ModuleName:", moduleNames[index]);
      if (selectedTeacher) {
        const updatedTeacher = {
          ...selectedTeacher,
          assigned: 1,
        };

        // Update the assigned field for the selected teacher
        const moduleName = moduleNames[index];

        // Update the corresponding assigned field based on the module name
        const assignedField = `assigned_${moduleName}`;

        // Update the assigned module field for the selected teacher
        axios
          .put(`/api/teachers/${selectedTeacher}/${moduleName}`, {
            ...updatedTeacher,
            [assignedField]: 1,
          })
          .then((response) => {
            console.log(
              `Teacher ${selectedTeacher} ${assignedField} updated successfully`
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const insertModule = () => {
    console.log(selectedTeachers);

    // Send the selected teachers to the API route
    axios
      .post(`/api/modules`, { teachers: selectedTeachers })
      .then((response) => {
        console.log("Teachers data sent successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getModuleName = (index) => {
    switch (index) {
      case 0:
        return "Software Engineering";
      case 1:
        return "Information and Communication S. and T.";
      case 2:
        return "Information S. and Web T.";
      case 3:
        return "Networks and distributed systems";
      case 4:
        return "Common Core";
      default:
        return "";
    }
  };

  const filterTeachersByRow = (index) => {
    switch (index) {
      case 0:
        // Filter teachers for the first row (Software Engineering)
        return teachers.filter(
          (teacher) =>
            (teacher.speciality === "GL" || teacher.speciality === "STIW") &&
            teacher.assigned === 0
        );
      case 1:
        // Filter teachers for the second row (Information and Communication S. and T.)
        return teachers.filter(
          (teacher) =>
            (teacher.speciality === "GL" || teacher.speciality === "STIW") &&
            teacher.assigned === 0
        );
      case 2:
        // Filter teachers for the third row (Information S. and Web T.)
        return teachers.filter(
          (teacher) =>
            (teacher.speciality === "RSD" || teacher.speciality === "STIC") &&
            teacher.assigned === 0
        );
      case 3:
        // Filter teachers for the fourth row (Networks and distributed systems)
        return teachers.filter(
          (teacher) =>
            (teacher.speciality === "RSD" || teacher.speciality === "STIC") &&
            teacher.assigned === 0
        );
      case 4:
        // Show all teachers for the fifth row (Common Core)
        return teachers.filter((teacher) => teacher.assigned === 0);
      default:
        return [];
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
    margin: "0 50%",
  };

  const buttonHoverStyles = {
    backgroundColor: "#fff",
    color: "var(--primary-color)",
    textDecoration: "none",
  };

  return (
    <div>
      {" "}
      <button
        style={buttonStyles}
        onMouseOver={() => (buttonStyles = buttonHoverStyles)}
        onMouseOut={() => (buttonStyles = {})}
        type="button"
        onClick={handleButtonClick}
      >
        Save
      </button>
      <div className="container">
        <div className="table-wrapper">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Module</th>
                <th>Teacher 1</th>
                <th>Teacher 2</th>
                <th>Teacher 3</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td>{getModuleName(index)}</td>
                  <td>
                    <select
                      value={selectedTeachers[index]?.matricule || ""}
                      onChange={(e) =>
                        handleTeacherChange(index, e.target.value)
                      }
                      disabled={disableDropdowns} // Disable the dropdown if disableDropdowns is true
                    >
                      <option value="">Select Teacher</option>
                      {filterTeachersByRow(index).map((teacher) => (
                        <option
                          key={teacher.teacher_id}
                          value={teacher.matricule}
                        >
                          {teacher.firstName} {teacher.lastName}
                        </option>
                      ))}
                    </select>
                    {selectedTeacherDetails[index] && (
                      <div>
                        Selected Teacher:{" "}
                        {`${selectedTeacherDetails[index].firstName} ${selectedTeacherDetails[index].lastName}`}
                      </div>
                    )}
                  </td>
                  <td>
                    <select
                      value={selectedTeachers[index + 5]?.matricule || ""}
                      onChange={(e) =>
                        handleTeacherChange(index + 5, e.target.value)
                      }
                      disabled={disableDropdowns} // Disable the dropdown if disableDropdowns is true
                    >
                      <option value="">Select Teacher</option>
                      {filterTeachersByRow(index).map((teacher) => (
                        <option
                          key={teacher.teacher_id}
                          value={teacher.matricule}
                        >
                          {teacher.firstName} {teacher.lastName}
                        </option>
                      ))}
                    </select>
                    {selectedTeacherDetails[index + 5] && (
                      <div>
                        Selected Teacher:{" "}
                        {`${selectedTeacherDetails[index + 5].firstName} ${
                          selectedTeacherDetails[index + 5].lastName
                        }`}
                      </div>
                    )}
                  </td>
                  <td>
                    <select
                      value={selectedTeachers[index + 10]?.matricule || ""}
                      onChange={(e) =>
                        handleTeacherChange(index + 10, e.target.value)
                      }
                      disabled
                    >
                      <option value="">Select Teacher</option>
                      {filterTeachersByRow(index).map((teacher) => (
                        <option
                          key={teacher.teacher_id}
                          value={teacher.matricule}
                        >
                          {teacher.firstName} {teacher.lastName}
                        </option>
                      ))}
                    </select>
                    {selectedTeacherDetails[index + 10] && (
                      <div>
                        Selected Teacher:{" "}
                        {`${selectedTeacherDetails[index + 10].firstName} ${
                          selectedTeacherDetails[index + 10].lastName
                        }`}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Assign;
