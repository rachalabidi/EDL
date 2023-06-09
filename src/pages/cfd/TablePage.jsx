import React, { useState, useEffect } from "react";
import axios from "axios";

const TablePage = ({ tableName }) => {
  const [tableData, setTableData] = useState([]);

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
  }, [tableName]);

  return (
    <div className="container">
      <div className="table-wrapper">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Code</th>
              <th>Note1</th>
              <th>Note2</th>
              <th>Note3</th>
              <th>Note1 - Note2 </th>
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
                <td>{row.noteD}</td>
                <td>{row.noteFM}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePage;
