import React, { useState } from "react";
import '../App.css'

const EmployeeSearch = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearch(searchText);
  };

  return (
    <form className="employee-edit-container" onSubmit={(e) => handleSubmit(e)}>
      <div className="form-group">
        <label htmlFor="searchText" className="form-label">
          Search
        </label>
        <input
          type="text"
          id="searchText"
          className="form-control"
          placeholder="Enter search text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default EmployeeSearch;
