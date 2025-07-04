import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  return !localStorage.getItem("Current_User") ? (
    <Outlet />
  ) : (
    <Navigate to={"/blogs"} />
  );
};

export default AuthRoutes;
