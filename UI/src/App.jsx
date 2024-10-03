import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeDirectory from "./components/EmployeeDirectory";
import CreateEmployee from "./components/EmployeeCreate";
import EmployeeEditPage from "./components/EmployeeEditPage";
import EmployeeDetail from "./components/EmployeeDetail";
import NavbarComponent from "./components/Navbar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavbarComponent />
        <EmployeeDirectory />
      </>
    ),
  },
  {
    path: "/create",
    element: (
      <>
        <NavbarComponent />
        <CreateEmployee />
      </>
    ),
  },
  {
    path: "/edit-employee/:id",
    element: (
      <>
        <NavbarComponent />
        <EmployeeEditPage />
      </>
    ),
  },
  {
    path: "/employee-details/:id",
    element: (
      <>
        <NavbarComponent />
        <EmployeeDetail />
      </>
    ),
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
