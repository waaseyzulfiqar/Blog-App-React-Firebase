import { useEffect, useState } from "react";
import { collection, db, deleteDoc, doc, getDocs } from "../config/firebase";
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
import { Bounce, toast } from "react-toastify";
import { DeleteOutlineOutlined } from "@mui/icons-material";

const Blogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllBlogs = async () => {
    let tempArr = [];
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "Blogs"));
      querySnapshot.forEach((doc) => {
        tempArr.push({id: doc.id, ...doc.data()});
      });
      setAllBlogs(tempArr);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.warn("Admin All Blogs Fetching Error -->", error.message);
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

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Stack
      flexDirection={"row"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      gap={"20px 10px"}
      padding={"30px 0"}
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
      ) : allBlogs.length > 0 ? (
        <>
          {allBlogs.map((blog) => (
            <Card
              key={blog.id}
              sx={{
                width: {
                  xs: "95%",
                  sm: "48%",
                  md: "30%",
                },
                minHeight: {
                  sm: 120,
                  md: 200,
                },
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
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => deleteBlog(blog.id)}
                  >
                    <DeleteOutlineOutlined />
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
  );
};

export default Blogs;
