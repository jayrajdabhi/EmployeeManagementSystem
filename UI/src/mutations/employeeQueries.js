import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
    query getEmployees {
        employees {
            id
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
            currentStatus
        }
    }
`;

export const GET_EMPLOYEE_BY_ID = gql`
    query getEmployee($id: ID!) {
        employee(id: $id) {
            id
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
            currentStatus
        }
    }
`;
