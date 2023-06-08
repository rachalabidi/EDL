import React, { useEffect, useState } from "react";
import axios from "axios";
const TableShowing = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    // Fetch data from the database using Axios
    axios
      .get("/api/gettable")
      .then((response) => {
        setModules(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  return (
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
            {modules.map((module, index) => (
              <tr key={module.id}>
                <td>{getModuleName(index)}</td>
                <td>{module.teacherNames[0]}</td>
                <td>{module.teacherNames[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableShowing;
