import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { collection, db, getDocs } from "../config/firebase";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

function AdminDashboard() {
  const [allPrivateBlogs, setAllPrivateBlogs] = useState(0);
  const [allPublicBlogs, setAllPublicBlogs] = useState(0);
  const [allUsers, setAllUsers] = useState(0);
  const [admins, setAdmins] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getAllBlogs = async () => {
    let privateBlogs = [];
    let publicBlogs = [];
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "Blogs"));
      querySnapshot.forEach((doc) => {
        if (doc.data().isPublic) {
          publicBlogs.push(doc.data());
        } else {
          privateBlogs.push(doc.data());
        }
      });
      setAllPrivateBlogs(privateBlogs.length);
      setAllPublicBlogs(publicBlogs.length);
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

  const getAllUsers = async () => {
    let users = [];
    let admins = [];
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "Users"));
      querySnapshot.forEach((doc) => {
        if (doc.data().type === "user") {
          users.push(doc.data());
        } else {
          admins.push(doc.data());
        }
      });
      setAllUsers(users.length);
      setAdmins(admins.length);
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
  useEffect(() => {
    getAllBlogs();
    getAllUsers();
  }, []);

  const cards = [
    {
      id: 1,
      title: "Private Blogs",
      description: allPrivateBlogs,
      color: "rgb(255, 102, 102)",
    },
    {
      id: 2,
      title: "Public blogs",
      description: allPublicBlogs,
      color: "rgb(102, 178, 255)",
    },
    {
      id: 3,
      title: "Users",
      description: allUsers,
      color: "rgb(103, 215, 103)",
    },
    {
      id: 4,
      title: "Admins",
      description: admins,
      color: "rgb(197, 108, 197)",
    },
  ];

  return isLoading ? (
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
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))",
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card sx={{bgcolor: `${card.color}`}} key={index}>
          <CardActionArea
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography color="white" variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography color="white" variant="h6">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default AdminDashboard;
