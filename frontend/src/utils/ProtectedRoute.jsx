import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If user Not logged in => redirect to Sign In
    return <Navigate to="/signin" replace />;
  }

  //If user  Logged in => allow access
  return children;
};

export default ProtectedRoute;
