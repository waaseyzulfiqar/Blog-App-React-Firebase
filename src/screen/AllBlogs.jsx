import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { query, collection, where, getDocs, db } from "../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getAllPublicBlogs = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, "Blogs"), where("isPublic", "==", true));

      const querySnapshot = await getDocs(q);

      const blogsArray = [];
      querySnapshot.forEach((doc) => {
        blogsArray.push({ id: doc.id, ...doc.data() });
      });
      setBlogs(blogsArray);
      setIsLoading(false);
    } catch (error) {
      console.warn("All Blogs Fetching Error -->", error.message);
      setIsLoading(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const hanldeRedirectToSingleBlogPage = (id) => {
    navigate(`/blog/${id}`);
  };

  useEffect(() => {
    getAllPublicBlogs();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom,#ffffff 0%, #F4F1FF 50%, #EDEAFF 100%)",
      }}
    >
      <Navbar />

      <Stack
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={"20px 10px"}
        padding={"30px 10px"}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <CircularProgress size="50px" />
          </Box>
        ) : blogs.length > 0 ? (
          <>
            {blogs.map((blog, index) => (
              <Card
                key={index}
                sx={{
                  width: {
                    xs: "95%",
                    sm: "45%",
                    md: "30%",
                  },
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                }}
              >
                <CardMedia
                  sx={{
                    height: 180,
                  }}
                  image={blog.url}
                  title={blog.title}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={"600"}
                    sx={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {blog.title}
                  </Typography>

                  <Box
                    sx={{
                      color: "text.secondary",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      typography: "body2", // MUI way to apply Typography style
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />
                </CardContent>
                <CardActions>
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    width={"100%"}
                  >
                    <Button
                      onClick={() => hanldeRedirectToSingleBlogPage(blog.id)}
                      size="small"
                      sx={{ color: "rgb(104, 81, 255)", fontSize: "0.8rem" }}
                    >
                      Learn More
                    </Button>
                    <Typography
                      display={"inline-block"}
                      bgcolor={"rgb(104, 81, 255)"}
                      component={"span"}
                      color="white"
                      p={"5px 10px"}
                      fontSize={"12px"}
                      borderRadius={"5px"}
                    >
                      {blog.subject}
                    </Typography>
                  </Stack>
                </CardActions>
              </Card>
            ))}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Typography variant="h4" color="rgb(104, 81, 255)">
              No Blogs yet...
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default AllBlogs;
