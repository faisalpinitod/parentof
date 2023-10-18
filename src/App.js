// src/App.js

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ username: "", clas: "", marks: 0, shoeSize: 0 });

  useEffect(() => {
    axios.get("http://localhost:3001/students").then((response) => {
      setStudents(response.data);
    });
  }, []);

  const handleAddStudent = () => {
    axios.post("http://localhost:3001/students", newStudent).then((response) => {
      setStudents([...students, response.data]);
      setNewStudent({ username: "", clas: "", marks: 0 });
    });
  };

  return (
    <div>
      <h1>Student </h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Marks</th>
            
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.username}</td>
              <td>{student.clas}</td>
              <td>{student.marks}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Add a Student</h2>
        <input
          type="text"
          placeholder="Name"
          value={newStudent.username}
          onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Class"
          value={newStudent.clas}
          onChange={(e) => setNewStudent({ ...newStudent, clas: e.target.value })}
        />
        <input
          type="number"
          placeholder="Marks"
          value={newStudent.marks}
          onChange={(e) => setNewStudent({ ...newStudent, marks: e.target.value })}
        />
        
        <button onClick={handleAddStudent}>Add Student</button>
      </div>
    </div>
  );
}

export default App;
