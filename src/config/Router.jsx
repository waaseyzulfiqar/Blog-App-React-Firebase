import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../adminScreens/adminDashboard";
import AllBlogs from "../screen/AllBlogs";
import CreateBlog from "../screen/CreateBlog";
import Login from "../screen/Login";
import MyBlogs from "../screen/MyBlogs";
import NotFoundError from "../screen/NotFoundError";
import Signup from "../screen/Signup";
import SingleBlog from "../screen/SingleBlog";
import AdminPrivateRoutes from "./AdminPrivateRoutes";
import UserPrivateRoutes from "./UserPrivateRoutes";
import AuthRoutes from "./AuthRoutes";

const Router = () => {
  return (
    <Routes>
      <Route index element={<AllBlogs />} />
      {/* Add this public route */}
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<UserPrivateRoutes />}>
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
      </Route>
      <Route element={<AdminPrivateRoutes />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/blogs" element={<AllBlogs />} />
      </Route>
      <Route path="*" element={<NotFoundError />} />
    </Routes>
  );
};

export default Router;
