import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentTable = () => {
  const matricule = localStorage.getItem("matricule");
  const [students, setStudents] = useState([]);
  const [notes, setNotes] = useState({});
  const [notesSaved, setNotesSaved] = useState(
    !!localStorage.getItem(`notesSaved_${matricule}`)
  );

  // Fetch students and notes from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/studentsens?matricule=${matricule}`
        );
        const data = response.data;
        console.log(data);
        setStudents(data);
        if (notesSaved) {
          const notesResponse = await axios.get(
            `/api/getNotes?matricule=${matricule}`
          );
          const notesData = notesResponse.data.notes;
          console.log(notesData);
          const updatedNotes = {};
          notesData.forEach((note) => {
            const { code } = note;
            Object.keys(note).forEach((key) => {
              if (key.startsWith("note")) {
                updatedNotes[code] = note[key];
              }
            });
          });

          setNotes(updatedNotes);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [matricule, notesSaved]);

  // Handle note change
  const handleNoteChange = (e, code) => {
    const { value } = e.target;
    setNotes((prevNotes) => ({
      ...prevNotes,
      [code]: value,
    }));
  };

  // Save notes
  const handleSaveNotes = () => {
    axios
      .post("/api/students/save-notes", {
        matricule,
        notes: Object.entries(notes).map(([code, noteValue]) => ({
          code,
          noteValue,
        })),
      })
      .then((response) => {
        console.log(response.data.message);
        setNotesSaved(true);
        localStorage.setItem(`notesSaved_${matricule}`, true);
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
    margin: "0 50%",
  };

  return (
    <div>
      {!notesSaved && (
        <button
          style={buttonStyles}
          type="button"
          onClick={handleSaveNotes}
          disabled={notesSaved}
        >
          Save Notes
        </button>
      )}
      <div className="container">
        <div className="table-wrapper">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Students</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.code}>
                  <td>{student.code}</td>
                  <td>
                    {notesSaved ? (
                      notes[student.code]
                    ) : (
                      <input
                        type="text"
                        value={notes[student.code] || ""}
                        onChange={(e) => handleNoteChange(e, student.code)}
                        disabled={notesSaved}
                      />
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

export default StudentTable;
