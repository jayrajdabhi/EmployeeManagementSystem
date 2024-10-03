import React from "react";
import { Link } from "react-router-dom";
import "./NavbarStyling.css";

const NavbarComponent = () => {
  return (

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
      <span className="navbar-title">
            <a href="/">Emplyoee Management System</a>
          </span>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
          <li className="navbar-item">
           <Link to="/create" className="navbar-link">
             Add New Employee
           </Link>
         </li>
          </ul>
        </div>
      </div>
    </nav>
    

    
    // <nav className="navbar">
    //   <ul className="navbar-list">
    //     <li className="navbar-item">
    //       <span className="navbar-title">
    //         <Link to="/" className="navbar-link">
    //           Employee Management System
    //         </Link>
    //       </span>
    //     </li>
    //     <li className="navbar-item">
    //       <Link to="/create" className="navbar-link">
    //         Add New Employee
    //       </Link>
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default NavbarComponent;
