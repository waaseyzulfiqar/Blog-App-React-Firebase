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
import { useRef, useState } from "react";
import { addDoc, collection, db } from "../config/firebase";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CreateBlog = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [blogImageUrl, setBlogImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const CLOUD_NAME = "dlwhx3dtg";

  const handleToggleChange = (e) => {
    setIsPublic(e.target.checked);
  };

  const handleTitleValue = (e) => {
    setTitle(e.target.value);
  };
  const handleSubjectValue = (e) => {
    setSubject(e.target.value);
  };
  const handleDescriptionValue = (e) => {
    setDescription(e.target.value);
  };

  const inputFileRef = useRef();

  const handleFileUpload = async (e) => {
    if (!e.target.files) return;
    let file = e.target.files[0];
    setImageFile(file);
    try {
      setIsUploading(true);
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "blog-image");
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
          formData
        );
        setIsUploading(false);
        setBlogImageUrl(res.data.secure_url);
        toast.success("Image Uploaded Successfully!", {
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
    } catch (error) {
      setImageFile(null);
      console.log("Image upload error", error.message);
    }
  };

  const handleNewBlogData = async () => {
    if (!title || !subject || !description || !blogImageUrl)
      return toast.error("Please fill all the fields..", {
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
        url: blogImageUrl,
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

  const handleSelectImageClick = () => {
    inputFileRef.current.click();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "35px 0",
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
          <Stack
            onClick={handleSelectImageClick}
            border={"2px dashed rgb(104, 81, 255)"}
            borderRadius={"12px"}
            alignItems={"center"}
            gap={2}
            py={2}
            bgcolor={"rgba(104, 81, 255, 0.05)"}
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(104, 81, 255, 0.1)",
              },
            }}
          >
            {isUploading ? (
              <CircularProgress size="30px" />
            ) : (
              <CloudUploadIcon
                sx={{ color: "rgb(104, 81, 255)" }}
                fontSize="large"
              />
            )}
            <Box>
              <Typography component={"h6"} color="rgb(104, 81, 255)">
                {isUploading
                  ? "Preparing Image File for Upload"
                  : "Upload Image"}
              </Typography>
            </Box>
            {!isUploading && (
              <Button
                variant="contained"
                sx={{ bgcolor: "rgb(104, 81, 255)" }}
                size="small"
              >
                <CloudUploadIcon sx={{ color: "white", mr: "7px" }} />
                Select Image
              </Button>
            )}
          </Stack>
          <input
            type="file"
            ref={inputFileRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
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
