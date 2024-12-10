import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";
const AddStudentForm = ({
  fetchStudents,
  studentsToEdit,
  setStudentsToEdit,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (studentsToEdit) {
      setName(studentsToEdit.name);
      setEmail(studentsToEdit.email);
      setGender(studentsToEdit.gender);
    }
  }, [studentsToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (studentsToEdit) {
        //Update existing student
        const headers = {
          headers : {'authorization' : localStorage.getItem('token')}
        }
        await axios.put(
          `http://localhost:8080/student/${studentsToEdit._id}`,
          {
            name,
            email,
            gender,
          },
          headers
        );
        handleSuccess('updated successfully!!!');
        fetchStudents();
        setName(""); // Reset form fields
        setEmail("");
        setGender("");
        setStudentsToEdit(null);
      } else {
        //Add New Student
        console.log('Token: ',localStorage.getItem('token'));
        const url = "https://booking-application-okby.onrender.com/student";
        const headers = {
          headers : {'authorization' : localStorage.getItem('token')}
        }
        await axios.post(url,{
          name,
          email,
          gender,
        },headers);
        handleSuccess('added successfully!!!');
        fetchStudents();
        setName(""); // Reset form fields
        setEmail("");
        setGender("");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        // Backend returned an error with a message
        setError(err.response.data.message);
        // Clear the error message after 2 seconds
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
        
      } else {
        // Other errors (network issue, etc.)
        setError("An unexpected error occurred. Please try again.");
        // Clear the error message after 2 seconds
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
      }
    }
  };

  const handleCancel = (e) => {
    setStudentsToEdit(e); // Set student data not to be edited
    setName(""); // Reset form fields
    setEmail("");
    setGender("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit" className="btn btn-primary">
          {studentsToEdit ? "Update" : "Add"}
        </button>
        {studentsToEdit && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleCancel(null)}
          >
            Cancel
          </button>
        )}
      </form>
      <ToastContainer/>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
    </div>
  );
};

export default AddStudentForm;
