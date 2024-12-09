import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddStudentForm from "../components/AddStudentForm";
import StudentsList from "../components/StudentsList";
import { Navbar } from "../components/layout";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [studentsToEdit, setStudentsToEdit] = useState(null);
  const [students, setStudents] = useState([]);
  const [LoggedInUser, setLoggedInUser] = useState("");
  const expiresIn = localStorage.getItem("expiresIn");

  const fetchStudents = async () => {
    try {
      console.log("in Fetch API");
      const url = "http://localhost:8080/student";
      const headers = {
        headers: { authorization: localStorage.getItem("token") },
      };
      const { data } = await axios.get(url, headers);
      setStudents(data);
      console.log("Fetching List:", data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Start timer to log user out when token expires
  const startLogoutTimer = (expiresIn) => {
    setTimeout(() => {
      logout();
    }, expiresIn);
  };

  // Function to log the user out
  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("expiresIn");
    navigate("/login");
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("LoggedInUser"));
    fetchStudents(); // Fetch initial student data

    if (expiresIn && Date.now() > expiresIn) {
      console.log('Logging out',expiresIn,'Date Now>>', Date.now());
      logout(); // Token expired, log user out
    } else if (expiresIn) {
      const timeLeft = expiresIn - Date.now();
      startLogoutTimer(timeLeft); // Start logout timer with remaining time
    }
  }, []);

  return (
    <div className="container">
      <Navbar LoggedInUser={LoggedInUser} />
      <h1>Student Management System</h1>
      <AddStudentForm
        fetchStudents={fetchStudents}
        studentsToEdit={studentsToEdit}
        setStudentsToEdit={setStudentsToEdit}
      />
      <StudentsList
        students={students}
        fetchStudents={fetchStudents}
        setStudentsToEdit={setStudentsToEdit}
      />
    </div>
  );
}

export default Home;
