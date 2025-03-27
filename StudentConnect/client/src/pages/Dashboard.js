import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

// Sample student data
const students = [
  {
    id: 1,
    name: "John Doe",
    studentClass: "10-A",
    img: `https://robohash.org/${encodeURIComponent("John Doe")}.png?size=100x100`,
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    leetcode: "https://leetcode.com/johndoe"
  },
  {
    id: 2,
    name: "Jane Smith",
    studentClass: "10-B",
    img: `https://robohash.org/${encodeURIComponent("Jane Smith")}.png?size=100x100`,
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
    leetcode: "https://leetcode.com/janesmith"
  },
  {
    id: 3,
    name: "Sabari Doss",
    studentClass: "10-B",
    img: `https://robohash.org/${encodeURIComponent("Doss")}.png?size=100x100`,
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
    leetcode: "https://leetcode.com/janesmith"
  },
  
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Student Connect</h1>
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <img src={student.img} alt={student.name} />
            <h2>{student.name}</h2>
            <p>Class: {student.studentClass}</p>
            <div className="links">
              <a href={student.github} target="_blank" rel="noopener noreferrer" className="github">
                <FaGithub className="icon" /> GitHub
              </a>
              <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin">
                <FaLinkedin className="icon" /> LinkedIn
              </a>
              <a href={student.leetcode} target="_blank" rel="noopener noreferrer" className="leetcode">
                <SiLeetcode className="icon" /> LeetCode
              </a>
            </div>
            <Link to={`/student/${student.id}`} className="view-profile">
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
