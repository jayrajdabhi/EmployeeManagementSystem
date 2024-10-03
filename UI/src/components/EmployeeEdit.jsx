import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_EMPLOYEE } from "../mutations/employeeMutation";
import { GET_EMPLOYEE_BY_ID } from "../mutations/employeeQueries";
import "./EmployeeEditStyling.css";

const EmployeeEdit = ({ employeeId }) => {
  const [newEmpData, setNewEmpData] = useState(null);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [successMessage, setSuccessMessage] = useState(null);

  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id: employeeId },
  });

  useEffect(() => {
    if (data && data.employee) {
      setNewEmpData(data.employee);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!newEmpData) return null;

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const parsedAge = parseInt(newEmpData.age);
      if (isNaN(parsedAge)) {
        throw new Error("Age must be a valid number.");
      }

      await updateEmployee({
        variables: {
          id: newEmpData.id,
          firstName: newEmpData.firstName,
          lastName: newEmpData.lastName,
          age: parsedAge,
          dateOfJoining: newEmpData.dateOfJoining,
          title: newEmpData.title,
          department: newEmpData.department,
          employeeType: newEmpData.employeeType,
          currentStatus: newEmpData.currentStatus,
        },
      });
      setSuccessMessage("Employee updated successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  };

  const formattedDateOfJoining = new Date(
    newEmpData.dateOfJoining
  ).toLocaleDateString("en-GB", dateOptions);

  const formattedDateToInputValue = (formattedDate) => {
    const [day, month, year] = formattedDate.split("/");
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="employee-edit-container">
      <div>
        <h3>Edit Employee</h3>
      </div>
      <div>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <form onSubmit={(e) => handleOnSubmit(e)} className="form">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input disabled
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
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input disabled
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
          </div>
          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              value={newEmpData.age}
              onChange={(e) =>
                setNewEmpData((currEmployee) => ({
                  ...currEmployee,
                  age: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Date of Joining</label>
            <input
              type="date"
              className="form-control"
              value={formattedDateToInputValue(formattedDateOfJoining)}
              onChange={(e) =>
                setNewEmpData((currEmployee) => ({
                  ...currEmployee,
                  dateOfJoining: e.target.value,
                }))
              }
            />
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
          </div>
          <div className="form-group">
            <label className="form-label">Current Status</label>
            <input
              type="checkbox"
              checked={newEmpData.currentStatus}
              onChange={(e) =>
                setNewEmpData((currEmployee) => ({
                  ...currEmployee,
                  currentStatus: e.target.checked,
                }))
              }
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEdit;
