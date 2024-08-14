import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ element: Component, ...rest }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <>
    { isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />}
    </>
  );
}

export default ProtectedRoutes;
