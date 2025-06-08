import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "../screen/Login";
import Signup from "../screen/Signup";
import CreateBlog from "../screen/CreateBlog";
import AllBlogs from "../screen/AllBlogs";
import NotFoundError from "../screen/NotFoundError";
import SingleBlog from "../screen/SingleBlog";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "./firebase";

const Main = () => {
  const [users, setUser] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    const currentLoggedInUser = JSON.parse(localStorage.getItem("Current_User"));
    onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (users || currentLoggedInUser) {
        if (location.pathname === "/login" || location.pathname === "/signup") {
          navigate("/");
        }
      } else {
        if (location.pathname === "/create-blog") {
          navigate("/login");
        }
      }
    });
  }, [location.pathname, navigate]);
  return <Outlet />;
};

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<AllBlogs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="*" element={<NotFoundError />} />
      </Route>
    </Routes>
  );
};

export default Router;
