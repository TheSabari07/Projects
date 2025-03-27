import React from "react";
import { useParams } from "react-router-dom";
import "../styles/StudentProfile.css";

const StudentProfile = () => {
  const { id } = useParams();

  // Mock data (Replace with API call later)
  const students = [
    { id: "1", name: "John Doe", class: "10-A", img: "https://via.placeholder.com/150", github: "https://github.com/johndoe", linkedin: "https://linkedin.com/in/johndoe" },
    { id: "2", name: "Jane Smith", class: "10-B", img: "https://via.placeholder.com/150", github: "https://github.com/janesmith", linkedin: "https://linkedin.com/in/janesmith" },
  ];

  const student = students.find((s) => s.id === id);

  if (!student) return <h2>Student not found</h2>;

  return (
    <div className="student-profile">
      <img src={student.img} alt={student.name} />
      <h1>{student.name}</h1>
      <p>Class: {student.class}</p>
      <div className="links">
        <a href={student.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={student.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
};

export default StudentProfile;
