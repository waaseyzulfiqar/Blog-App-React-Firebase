import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { addDoc, collection, db } from "../config/firebase";
import { Bounce, toast } from "react-toastify";

const CreateBlog = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleChange = (e) => {
    setIsPublic(e.target.checked);
  };

  const handleTitleValue = (e) => {
    if (!e.target.value) return;
    setTitle(e.target.value);
  };
  const handleSubjectValue = (e) => {
    if (!e.target.value) return;
    setSubject(e.target.value);
  };
  const handleDescriptionValue = (e) => {
    if (!e.target.value) return;
    setDescription(e.target.value);
  };

  const handleNewBlogData = async () => {
    const currentLoggedInUser = JSON.parse(
      localStorage.getItem("Current_User")
    );

    let newDataObj;

    if (currentLoggedInUser) {
      newDataObj = {
        title,
        subject,
        description,
        isPublic,
        userId: currentLoggedInUser.uid,
      };
    }

    try {
      setIsLoading(true);
      await addDoc(collection(db, "Blogs"), newDataObj);
      setTitle("");
      setSubject("");
      setDescription("");
      setIsLoading(false);
      toast.success("Blog Created Succefully!", {
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
      console.warn("Blog Creation Error -->", error.message);
      setTitle("");
      setSubject("");
      setDescription("");
      setIsLoading(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:
          "linear-gradient(to bottom,#ffffff 0%, #F4F1FF 50%, #EDEAFF 100%)",
      }}
    >
      <Stack
        boxShadow={" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        padding={"30px 20px"}
        borderRadius={"10px"}
        sx={{
          width: {
            xs: "95%",
            sm: "65%",
            md: "42%",
          },
        }}
      >
        <Box sx={{ mb: "10px" }}>
          <Typography variant="h4" sx={{ fontWeight: "600", mb: "5px" }}>
            Create a New Blog
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            Share your thoughts, stories, or ideas with the world
          </Typography>
        </Box>

        <Stack gap={"15px"} marginTop={"20px"}>
          <TextField
            value={title}
            onChange={handleTitleValue}
            size="small"
            label="Title"
            type="text"
            fullWidth
          />
          <TextField
            value={subject}
            onChange={handleSubjectValue}
            size="small"
            label="Category"
            type="text"
            fullWidth
          />

          <TextField
            value={description}
            onChange={handleDescriptionValue}
            label="Description"
            multiline
            rows={4}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={isPublic}
                onChange={handleToggleChange}
                name="visibility"
              />
            }
            label={isPublic ? "Public" : "Private"}
          />

          <Button
            onClick={handleNewBlogData}
            sx={{
              mt: "10px",
              bgcolor: "rgb(104, 81, 255)",
              textTransform: "capitalize",
            }}
            variant="contained"
            fullWidth
            disabled={isLoading}
          >
            {isLoading && (
              <CircularProgress size="20px" color="white" sx={{ mr: "10px" }} />
            )}
            Create
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreateBlog;
