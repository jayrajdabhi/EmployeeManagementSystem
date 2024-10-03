import React from "react";
import EmployeeRow from "./EmployeeRow";
import "./EmployeeTable.css";

const EmployeeTable = ({ employeeList, setEmployeeList, setEditEmployee }) => {
  const tableHeaders = [
    "Serial No.",
    "First Name",
    "Last Name",
    "Age",
    "Date of Joining",
    "Title",
    "Department",
    "Employee Type",
    "Current Status",
    "Actions",
  ];

  if (!employeeList || employeeList.length === 0) {
    return <p>Could Not found any employees.</p>;
  }

  const employeeRows = employeeList.map((employee, index) => (
    <EmployeeRow
      key={employee.id}
      index={index + 1}
      employee={employee}
      setEmployeeList={setEmployeeList}
      setEditEmployee={setEditEmployee}
    />
  ));

  return (
    <table className="employee-table">
      <thead>
        <tr>
          {tableHeaders.map((header, index) => (
            <th key={index} className="table-header">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{employeeRows}</tbody>
    </table>
  );
};

export default EmployeeTable;
