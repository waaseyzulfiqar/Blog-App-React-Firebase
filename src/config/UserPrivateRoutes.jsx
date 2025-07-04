import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

const UserPrivateRoutes = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("Current_User") || "null");
    setUser(currentUser);
  }, []);

  return user?.type === 'user' ? <Outlet /> : <Navigate to={'/'} />
}

export default UserPrivateRoutes