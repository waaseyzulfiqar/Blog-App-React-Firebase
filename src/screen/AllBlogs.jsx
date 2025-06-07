import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { query, collection, where, getDocs, db } from "../config/firebase";
import { useEffect, useState } from "react";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllPublicBlogs = async () => {
    try {
      const q = query(collection(db, "Blogs"), where("isPublic", "==", true));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setBlogs((prev) => [...prev, doc.data()]);
      });
    } catch (error) {}
  };

  console.log("blogs", blogs);

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
        {blogs.map((blog) => (
          <Card key={blog.userId} sx={{ width: 400, minHeight: 200 }}>
            {/* <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        /> */}
            <CardContent>
              <Typography gutterBottom variant="h6" fontWeight={"600"}>
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
              <Button size="small" sx={{ color: "rgb(104, 81, 255)" }}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default AllBlogs;
