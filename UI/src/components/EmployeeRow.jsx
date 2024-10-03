import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_EMPLOYEE } from "../mutations/employeeMutation";
import { useNavigate } from "react-router-dom";

const EmployeeRow = (props) => {
  const navigate = useNavigate();
  const rowStyle = props.rowStyle;
  const employee = props.employee;
  const index = props.index;
  const setEmployeeList = props.setEmployeeList;

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    variables: { id: employee.id },
  });

  const handleOnDelete = () => {
    deleteEmployee();
    setEmployeeList((currEmployeeList) => {
      return currEmployeeList.filter(
        (currEmployee) => currEmployee.id !== employee.id
      );
    });
  };
  const handleEditEmployee = (employeeId) => {
    navigate(`/edit-employee/${employee.id}`);
  };

  if (!employee) return <h3>EmployeeRow</h3>;

  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  };

  const handleViewDetails = () => {
    navigate(`/employee-details/${employee.id}`);
  };

  const formattedDateOfJoining = new Date(
    employee.dateOfJoining
  ).toLocaleDateString("en-GB", dateOptions);

  const statusText = employee.currentStatus ? "Working" : "Not Working";
  return (
    <tr>
      <td style={rowStyle}>{index}</td>
      {Object.entries(employee).map(([key, value], i) => {
        if (key !== "__typename" && key !== "id") {
          return (
            <td key={i} style={rowStyle}>
              {key === "dateOfJoining"
                ? formattedDateOfJoining
                : key === "currentStatus"
                ? statusText
                : value}
            </td>
          );
        }
        return null;
      })}

      <td style={{ textAlign: "center" }}>
        <button className="btn btn-success"
          onClick={handleEditEmployee}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "5px",
          }}
        >
          Edit
        </button>
        <button className="btn btn-danger"
          onClick={handleOnDelete}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "5px",
          }}
        >
          Delete
        </button>
        <button className="btn btn-secondary"
          onClick={handleViewDetails}
          style={{
            backgroundColor: "#2196F3",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Details
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;
