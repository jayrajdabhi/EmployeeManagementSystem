import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEE_BY_ID } from "../mutations/employeeQueries";
import { useParams } from "react-router-dom";
import "./EmployeeDetailStyling.css";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (data && data.employee) {
      setEmployee(data.employee);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!employee) return null;

  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  };

  const formattedDateOfJoining = new Date(
    employee.dateOfJoining
  ).toLocaleDateString("en-GB", dateOptions);

  return (
    <div className="employee-detail-container">
      <div className="detail-header">
        <h3 className="detail-heading">Employee Details</h3>
      </div>
      <div className="detail-body">
        <form>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              value={employee.firstName}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={employee.lastName}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              value={employee.age}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Date of Joining</label>
            <input
              type="text"
              className="form-control"
              value={formattedDateOfJoining}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={employee.title}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              value={employee.department}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Employee Type</label>
            <input
              type="text"
              className="form-control"
              value={employee.employeeType}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Current Status</label>
            <input
              type="text"
              className="form-control"
              value={employee.currentStatus ? "Working" : "Not Working"}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDetail;
