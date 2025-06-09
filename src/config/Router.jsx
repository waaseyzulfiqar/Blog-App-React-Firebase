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
import { Box, CircularProgress } from "@mui/material";
import MyBlogs from "../screen/MyBlogs";

const Main = () => {
  const [users, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentLoggedInUser = JSON.parse(
      localStorage.getItem("Current_User")
    );
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);

      if (user && currentLoggedInUser) {
        if (location.pathname === "/login" || location.pathname === "/signup") {
          navigate("/");
        }
      } else {
        if (location.pathname === "/create-blog" || location.pathname === "/my-blogs") {
          navigate("/login");
        }
      }
    });
  }, [location.pathname, users]);

  if (isLoading)
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(to bottom,#ffffff 0%, #F4F1FF 50%, #EDEAFF 100%)",
        }}
      >
        <CircularProgress size="50px" />
      </Box>
    );

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
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="*" element={<NotFoundError />} />
      </Route>
    </Routes>
  );
};

export default Router;
