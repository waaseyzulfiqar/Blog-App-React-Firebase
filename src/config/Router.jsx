import { Route, Routes } from "react-router-dom";
import Login from "../screen/Login";
import Signup from "../screen/Signup";
import CreateBlog from "../screen/CreateBlog";
import AllBlogs from "../screen/AllBlogs";
import NotFoundError from "../screen/NotFoundError";

const Router = () => {
  return (
    <Routes>
      <Route index element={<AllBlogs />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFoundError />} />
    </Routes>
  );
};

export default Router;
