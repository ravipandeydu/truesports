import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((store) => store.auth.isAuth);
  console.log(isAuth);
  if (isAuth) {
    return children;
  }
  return <Navigate to="/signin" />;
};

export default PrivateRoute;
