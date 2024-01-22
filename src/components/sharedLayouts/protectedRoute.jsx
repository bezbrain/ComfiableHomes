import React from "react";
import { Home } from "../../pages";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const authToken = sessionStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
