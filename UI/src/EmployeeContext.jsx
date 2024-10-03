import React, { createContext, useContext, useState } from "react";

const EmployeeContext = createContext();
export const useEmployeeContext = () => useContext(EmployeeContext);
export const EmployeeProvider = ({ children }) => {
  const [employeeList, setEmployeeList] = useState([]);

  return (
    <EmployeeContext.Provider value={[employeeList, setEmployeeList]}>
      {children}
    </EmployeeContext.Provider>
  );
};
