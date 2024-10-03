import React from "react";
import { useParams } from "react-router-dom";
import EmployeeEdit from "./EmployeeEdit";

const EmployeeEditPage = () => {
  const { id } = useParams();

  return (
    <div>
      <div>
        <div className="col-md-6">
          <EmployeeEdit employeeId={id} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeEditPage;
