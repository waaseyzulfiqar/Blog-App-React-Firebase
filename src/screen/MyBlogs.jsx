import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import {
  query,
  collection,
  where,
  getDocs,
  db,
  deleteDoc,
  doc,
} from "../config/firebase";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getAllBlogs = async () => {
    const currentLoggedInUser = JSON.parse(
      localStorage.getItem("Current_User")
    );

    if (!currentLoggedInUser) return;

    try {
      setIsLoading(true);
      const q = query(
        collection(db, "Blogs"),
        where("userId", "==", currentLoggedInUser.uid)
      );

      const querySnapshot = await getDocs(q);

      const blogsArray = [];
      querySnapshot.forEach((doc) => {
        blogsArray.push({ id: doc.id, ...doc.data() });
      });
      setBlogs(blogsArray);
      setIsLoading(false);
    } catch (error) {
      console.warn("My Blogs Fetching Error -->", error.message);
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

  const deleteBlog = async (blogId) => {
    try {
      await deleteDoc(doc(db, "Blogs", blogId));
      getAllBlogs();
      toast.success("Blog Deleted Successfully!", {
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
    } catch (error) {
      console.warn("Blog Deleting Error -->", error.message);
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

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom,#ffffff 0%, #F4F1FF 50%, #EDEAFF 100%)",
      }}
    >
      <Box sx={{ alignSelf: "flex-start", py: 2, ml: { md: 6, sm: 4, xs: 2 } }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ textTransform: "none" }}
        >
          Go Back
        </Button>
      </Box>
      <Typography
        sx={{
          fontSize: {
            xs: "1.8rem",
            sm: "2.2rem",
            md: "2.8rem",
          },
          background: "linear-gradient(106.43deg, #522fd4, #6bdcff 95.12%)",
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text",
        }}
        display={"flex"}
        justifyContent={"center"}
        pt={"10px"}
        fontWeight={"600"}
      >
        My Blogs
      </Typography>
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

                  <Typography
                    display={"inline-block"}
                    bgcolor={"rgb(104, 81, 255)"}
                    component={"span"}
                    color="white"
                    p={"5px 10px"}
                    fontSize={"12px"}
                    borderRadius={"5px"}
                    my={"10px"}
                  >
                    {blog.subject}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {blog.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Box>
                      <Button
                        onClick={() => hanldeRedirectToSingleBlogPage(blog.id)}
                        size="small"
                        sx={{ color: "rgb(104, 81, 255)", fontSize: "0.8rem" }}
                      >
                        Learn More
                      </Button>
                    </Box>
                    <Stack flexDirection={"row"} alignItems={"center"} gap={3}>
                      {!blog.isPublic && (
                        <Tooltip placement="top" title="Private">
                          <IconButton>
                            <VisibilityOffIcon
                              sx={{
                                color: "rgb(104, 81, 255)",
                                cursor: "pointer",
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => deleteBlog(blog.id)}
                      >
                        <DeleteOutlineOutlined />
                      </Button>
                    </Stack>
                  </Stack>
                </CardActions>
              </Card>
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default MyBlogs;
