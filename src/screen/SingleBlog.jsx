import { useParams } from "react-router-dom";
import { db, doc, getDoc } from "../config/firebase";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SingleBlog = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const getSingleBlog = async () => {
    if (!params.id) return;
    try {
      setIsLoading(true);
      const docRef = doc(db, "Blogs", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      }
      setIsLoading(false);
    } catch (error) {
      console.warn("Single Blog Fetching Error -->", error.message);
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
    getSingleBlog();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom,#ffffff 0%, #F4F1FF 50%, #EDEAFF 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      {isLoading ? (
        <CircularProgress size="40px" />
      ) : (
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems={{
            xs: "flex-start",
            sm: "center",
            md: "flex-start",
          }}
          justifyContent="center"
        >
          <Box sx={{ alignSelf: "flex-start", mb: 2 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              // onClick={handleGoBack}
              sx={{ textTransform: "none" }}
            >
              Go Back
            </Button>
          </Box>
          <Box width={{ xs: "95%", sm: "80%", md: "45%" }}>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "2.8rem",
                },
              }}
              fontWeight={600}
              mb={2}
            >
              {data.title}
            </Typography>
          </Box>

          <Box width={{ xs: "95%", sm: "80%", md: "45%" }}>
            <Typography variant="body1" lineHeight={1.6}>
              {data.description}
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default SingleBlog;
