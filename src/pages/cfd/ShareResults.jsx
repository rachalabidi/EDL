import React, { useEffect, useState } from "react";
import axios from "axios";

const ShareResults = () => {
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const generateFinalNotesPDF = async () => {
    try {
      const response = await axios.get("/api/calculate-final-notes");
      const result = response.data;
      console.log(result.data);
      setData(result.data);
      setShowTable(result.data.length > 0); // Show the table only if data is not empty
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const show = async () => {
    try {
      const response = await axios.get("/api/affich-final-notes");
      const result = response.data;
      console.log(result.data);
      setData(result.data);
      setShowTable(result.data.length > 0); // Show the table only if data is not empty
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    show();
  }, []);

  const handleShareResults = () => {
    generateFinalNotesPDF();
    show();
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
        <button style={buttonStyles} type="button" onClick={handleShareResults}>
          Share Results
        </button>
      </div>
      <div className="container">
        {showTable && (
          <div className="table-wrapper">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Final Note</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.notef}</td>
                    <td>{index < 3 ? "Success" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!showTable && <div>No final notes available.</div>}
      </div>
    </div>
  );
};

export default ShareResults;
