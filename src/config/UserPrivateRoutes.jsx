import { Navigate, Outlet } from "react-router-dom";

const UserPrivateRoutes = () => {
  const user = JSON.parse(localStorage.getItem("Current_User"));

  if (!user?.uid) return <Navigate to="/login" />;
  if (user?.type !== "user") return <Navigate to="/admin/dashboard" />;
  if (user?.isActive === false) return <Navigate to="/login" />;

  return <Outlet />;
};
export default UserPrivateRoutes;
