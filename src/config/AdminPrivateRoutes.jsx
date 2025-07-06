import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

const AdminPrivateRoutes = () => {
  const user = JSON.parse(localStorage.getItem("Current_User"));

  if (!user?.uid) return <Navigate to="/login" />;
  if (user?.type !== "admin") return <Navigate to="/" />;
  if (user?.isActive === false) return <Navigate to="/login" />;

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminPrivateRoutes;
