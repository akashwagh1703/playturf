import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/auth";

const ProtectedRoute = ({ children, roles }) => {
  const auth = getAuth();

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(auth.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
