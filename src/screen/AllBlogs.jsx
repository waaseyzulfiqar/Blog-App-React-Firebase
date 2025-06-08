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

      querySnapshot.forEach((doc) => {
        setBlogs((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
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
        background: "linear-gradient(0deg, #F4F1FF 50%, #EDEAFF 100%)",
      }}
    >
      <Navbar />

      <Stack
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={"10px"}
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
        ) : (
          <>
            {blogs.map((blog, index) => (
              <Card key={index} sx={{ width: 400, minHeight: 150 }}>
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
                  <Typography
                    mb={"10px"}
                    display={"inline-block"}
                    bgcolor={"rgb(104, 81, 255)"}
                    component={"span"}
                    color="white"
                    p={"5px"}
                    fontSize={"12px"}
                    borderRadius={"5px"}
                  >
                    {blog.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {blog.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => hanldeRedirectToSingleBlogPage(blog.id)}
                    size="small"
                    sx={{ color: "rgb(104, 81, 255)" }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default AllBlogs;
