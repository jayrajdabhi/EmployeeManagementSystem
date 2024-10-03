import React from "react";
import "./FilterStyle.css";

const EmployeeFilter = ({ filters, onFilterChange }) => {
  const departments = ["IT", "Marketing", "HR", "Engineering"];
  const jobTitles = ["Employee", "Manager", "Director", "VP"];
  const ageOptions = ["Ascending", "Descending"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filter-container">
      <h3 className="filter-heading">Filter Options</h3>
      <div className="filter-row">
        <div className="filter-col">
          <label htmlFor="currentStatus" className="filter-label">
            Status:
          </label>
          <select
            className="filter-select"
            id="currentStatus"
            name="currentStatus"
            value={filters.currentStatus || ""}
            onChange={handleInputChange}
          >
            <option value="">All Statuses</option>
            <option value="true">Working</option>
            <option value="false">Not Working</option>
          </select>
        </div>
        <div className="filter-col">
          <label htmlFor="department" className="filter-label">
            Department:
          </label>
          <select
            className="filter-select"
            id="department"
            name="department"
            value={filters.department || ""}
            onChange={handleInputChange}
          >
            <option value="">All Departments</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-col">
          <label htmlFor="age" className="filter-label">
            Age:
          </label>
          <select
            className="filter-select"
            id="age"
            name="age"
            value={filters.age || ""}
            onChange={handleInputChange}
          >
            <option value="">Default</option>
            {ageOptions.map((option) => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        </div>
       
        <div className="filter-col">
          <label htmlFor="title" className="filter-label">
            Job Title:
          </label>
          <select
            className="filter-select"
            id="title"
            name="title"
            value={filters.title || ""}
            onChange={handleInputChange}
          >
            <option value="">All Job Titles</option>
            {jobTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilter;
