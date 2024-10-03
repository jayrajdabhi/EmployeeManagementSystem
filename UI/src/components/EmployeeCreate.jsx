import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EMPLOYEE } from "../mutations/employeeMutation";
import "./EmployeeCreateStyling.css";

const EmployeeCreate = () => {
  const [newEmpData, setNewEmpData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dateOfJoining: "",
    title: "",
    department: "",
    employeeType: "",
    currentStatus: true,
  });

  const [ageError, setAgeError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [dateOfJoiningError, setDateOfJoiningError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [employeeTypeError, setEmployeeTypeError] = useState("");

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    variables: {
      firstName: newEmpData.firstName,
      lastName: newEmpData.lastName,
      age: parseInt(newEmpData.age),
      dateOfJoining: newEmpData.dateOfJoining,
      title: newEmpData.title,
      department: newEmpData.department,
      employeeType: newEmpData.employeeType,
      currentStatus: newEmpData.currentStatus,
    },
    onCompleted: (newValue) => {
      setNewEmpData((currEmployee) => ({
        ...currEmployee,
        id: newValue.addEmployee.id,
      }));
    },
  });

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    let isValid = true;

    // Validate firstName
    if (newEmpData.firstName.trim() === "") {
      setFirstNameError("First Name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    // Validate lastName
    if (newEmpData.lastName.trim() === "") {
      setLastNameError("Last Name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    // Validate age
    if (!validateAge(newEmpData.age)) {
      setAgeError("Age must be between 20 and 70");
      isValid = false;
    } else {
      setAgeError("");
    }

    // Validate dateOfJoining
    if (newEmpData.dateOfJoining.trim() === "") {
      setDateOfJoiningError("Date of Joining is required");
      isValid = false;
    } else {
      setDateOfJoiningError("");
    }

    // Validate title
    if (newEmpData.title.trim() === "") {
      setTitleError("Title is required");
      isValid = false;
    } else {
      setTitleError("");
    }

    // Validate department
    if (newEmpData.department.trim() === "") {
      setDepartmentError("Department is required");
      isValid = false;
    } else {
      setDepartmentError("");
    }

    // Validate employeeType
    if (newEmpData.employeeType.trim() === "") {
      setEmployeeTypeError("Employee Type is required");
      isValid = false;
    } else {
      setEmployeeTypeError("");
    }

    // If any field is invalid, return without submitting
    if (!isValid) {
      return;
    }

    // All validations passed, proceed to add employee
    try {
      await addEmployee();
      // Reset form fields after successful submission
      setNewEmpData({
        firstName: "",
        lastName: "",
        age: "",
        dateOfJoining: "",
        title: "",
        department: "",
        employeeType: "",
        currentStatus: true,
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const validateAge = (age) => {
    return age >= 20 && age <= 70;
  };

  return (
    <div className="employee-form-container">
      <h3 className="form-heading">Add Employee</h3>
      <div className="form-wrapper">
        <form onSubmit={(e) => handleOnSubmit(e)} className="form">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              value={newEmpData.firstName}
              onChange={(e) =>
                setNewEmpData((currEmployee) => ({
                  ...currEmployee,
                  firstName: e.target.value,
                }))
              }
            />
            {firstNameError && <p className="error-message">{firstNameError}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={newEmpData.lastName}
              onChange={(e) =>
                setNewEmpData((currEmployee) => ({
                  ...currEmployee,
                  lastName: e.target.value,
                }))
              }
            />
            {lastNameError && <p className="error-message">{lastNameError}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              value={newEmpData.age}
              onChange={(e) => {
                const age = e.target.value;
                if (!isNaN(age) && age >= 20 && age <= 70) {
                  setAgeError("");
                } else {
                  setAgeError("Age must be between 20 and 70");
                }
                setNewEmpData((currEmployee) => ({
                  ...currEmployee,
                  age: age,
                }));
              }}
            />
            {ageError && <p className="error-message">{ageError}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Date of Joining</label>
            <input
              type="date"
              className="form-control"
              value={newEmpData.dateOfJoining}
              onChange={(e) =>
                setNewEmpData((currEmployee) => ({
                  ...currEmployee,
                  dateOfJoining: e.target.value,
                }))
              }
            />
            {dateOfJoiningError && <p className="error-message">{dateOfJoiningError}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Title</label>
            <select
              className="form-control"
              value={newEmpData.title}
              onChange={(e) =>
                setNewEmpData((currEmployee) => ({
                  ...currEmployee,
                  title: e.target.value,
                }))
              }
            >
              <option value="">Select Title</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
            {titleError && <p className="error-message">{titleError}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <select
              className="form-control"
              value={newEmpData.department}
              onChange={(e) =>
                setNewEmpData((currEmployee) => ({
                  ...currEmployee,
                  department: e.target.value,
                }))
              }
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
            {departmentError && <p className="error-message">{departmentError}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Employee Type</label>
            <select
              className="form-control"
              value={newEmpData.employeeType}
              onChange={(e) =>
                setNewEmpData((currEmployee) => ({
                  ...currEmployee,
                  employeeType: e.target.value,
                }))
              }
            >
              <option value="">Select Employee Type</option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
            {employeeTypeError && <p className="error-message">{employeeTypeError}</p>}
          </div>
          <button type="submit" className="btn btn-primary">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeCreate;
