import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import moment from "moment";

import "./csv.css";

const CsvRegister = () => {
  const [fileName, setFileName] = useState("");

  const parseCsv = (file) => {
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        results.data.forEach((row) => {
          row.birthday = moment(row.birthday, "DD/MM/YYYY ").format(
            "YYYY-MM-DD "
          );
          row.password = "password123";

          console.log(row);
          console.log("it works herere");

          axios
            .post("/api/register", row)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      },
    });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    parseCsv(file);
    const path = event.target.value.split("\\");
    setFileName(path[path.length - 1]);
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "50px",
      }}
    >
      <input className="upload-path" value={fileName} readOnly />
      <label className="upload">
        <input type="file" onChange={handleFileChange} />
        <span>Choose File...</span>
      </label>
    </div>
  );
};

export default CsvRegister;
