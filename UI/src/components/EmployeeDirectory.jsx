import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import EmployeeTable from "./EmployeeTable";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeFilter from "./EmployeeFilter";
import { GET_EMPLOYEES } from "../mutations/employeeQueries";

const EmployeeDirectory = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [filters, setFilters] = useState({
    age: "",
    department: "",
    title: "",
    employeeType: "",
    currentStatus: "",
  });

  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  useEffect(() => {
    if (data && data.employees) {
      setEmployeeList(data.employees);
      setFilteredEmployeeList(data.employees);
    }
  }, [data]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line
  }, [filters, employeeList]);

  const applyFilters = () => {
    let filteredEmployees = [...employeeList];

    if (filters.age !== "") {
      if (filters.age === "ascending") {
        filteredEmployees = filteredEmployees.sort((a, b) => a.age - b.age);
      } else if (filters.age === "descending") {
        filteredEmployees = filteredEmployees.sort((a, b) => b.age - a.age);
      }
    }

    if (filters.department !== "") {
      filteredEmployees = filteredEmployees.filter(
        (employee) =>
          employee.department.toLowerCase() === filters.department.toLowerCase()
      );
    }

    if (filters.title !== "") {
      filteredEmployees = filteredEmployees.filter(
        (employee) =>
          employee.title.toLowerCase() === filters.title.toLowerCase()
      );
    }

    if (filters.employeeType !== "") {
      filteredEmployees = filteredEmployees.filter(
        (employee) =>
          employee.employeeType.toLowerCase() ===
          filters.employeeType.toLowerCase()
      );
    }

    if (filters.currentStatus !== "") {
      filteredEmployees = filteredEmployees.filter(
        (employee) =>
          employee.currentStatus === (filters.currentStatus === "true")
      );
    }

    setFilteredEmployeeList(filteredEmployees);
  };

  const handleSearch = (text) => {
    const filteredEmployeeList = employeeList.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(text.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEmployeeList(filteredEmployeeList);
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <div>
        <div>
          <div>
            <EmployeeSearch handleSearch={handleSearch} />
          </div>
        </div>
        <br></br>
        <div>
          <div>
            <EmployeeFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <div>
          <div>
            <EmployeeTable
              employeeList={filteredEmployeeList}
              setEditEmployee={setEditEmployee}
              setEmployeeList={setEmployeeList}
            />
          </div>
        </div>

        <div>
          <div>
            {editEmployee !== null && (
              <EmployeeEdit
                editEmployee={editEmployee}
                setEmployeeList={setEmployeeList}
                setEditEmployee={setEditEmployee}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
