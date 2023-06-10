import React, { useState, useEffect } from "react";
import axios from "axios";

const TablePage = ({ tableName }) => {
  const [tableData, setTableData] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    // Fetch table data from the database based on the tableName
    axios
      .get(`/api/${tableName}_notes`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setTableData(data);
      })
      .catch((error) => {
        // Handle the error
      });

    // Fetch teacher options from the database
    axios
      .get(`/api/teachers?assigned_${tableName}=0`)
      .then((response) => {
        const teachers = response.data;
        console.log(teachers);
        setTeacherOptions(teachers);
      })
      .catch((error) => {
        // Handle the error
      });
  }, [tableName]);

  const calculateDifference = (note1, note2) => {
    const maxNote = Math.max(note1, note2);
    const minNote = Math.min(note1, note2);
    return maxNote - minNote;
  };

  const handleUpdateNoteD = () => {
    const updatedTableData = tableData.map((row) => {
      const noteD = calculateDifference(row.note1, row.note2);
      const noteFM = noteD < 3 ? (row.note1 + row.note2) / 2 : row.noteFM;

      return {
        ...row,
        noteD,
        noteFM,
      };
    });

    axios
      .post(`/api/${tableName}_notes/update-all`, {
        tableData: updatedTableData,
      })
      .then((response) => {
        console.log(updatedTableData);
        console.log(response.data.message);
        // Handle success
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // Handle error
      });
  };

  const handleTeacherSelect = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleAssignTeacher = () => {
    // Update the selected teacher in the modules table
    axios
      .post(`/api/modules/update-matricule3`, {
        tableName: tableName,
        matricule: selectedTeacher,
      })
      .then((response) => {
        console.log(response.data.message);
        // Handle success
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // Handle error
      });
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
    // margin: "0 50%",
  };
  const filterTeachers = teacherOptions.filter(
    (teacher) =>
      teacher[`assigned_${tableName}`] === 0 && teacher.assigned === 0
  );

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto", // Adjusted the grid template columns
          gap: "20px",
          alignItems: "center",
          width: "70%",
          margin: "auto",
        }}
      >
        <select value={selectedTeacher} onChange={handleTeacherSelect}>
          <option value="">Select Teacher</option>
          {filterTeachers.map((teacher) => (
            <option key={teacher.matricule} value={teacher.matricule}>
              {teacher.firstName} {teacher.lastName}
            </option>
          ))}
        </select>
        <button style={buttonStyles} onClick={handleAssignTeacher}>
          Assign Teacher
        </button>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <button style={buttonStyles} onClick={handleUpdateNoteD}>
          Update All NoteD
        </button>
      </div>

      <div className="container">
        <div className="table-wrapper">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Code</th>
                <th>Note1</th>
                <th>Note2</th>
                <th>Note3</th>
                <th>Difference</th>
                <th>Note Final</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.code}>
                  <td>{row.code}</td>
                  <td>{row.note1}</td>
                  <td>{row.note2}</td>
                  <td>{row.note3}</td>
                  <td>{calculateDifference(row.note1, row.note2)}</td>
                  <td>{row.noteFM}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablePage;
