import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const user = JSON.parse(localStorage.getItem("Current_User"));
  const isLoggedIn = !!user?.uid;

  return !isLoggedIn ? (
    <Outlet />
  ) : user?.type === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/" />
  );
};
export default AuthRoutes;
