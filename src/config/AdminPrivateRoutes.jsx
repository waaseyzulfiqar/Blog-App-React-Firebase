import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { useEffect, useState } from "react";

const AdminPrivateRoutes = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("Current_User") || "null");
    setUser(currentUser);
  }, []);

  return user?.type === "admin" ? (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminPrivateRoutes;