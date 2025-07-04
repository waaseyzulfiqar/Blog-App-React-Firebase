import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundError = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    try {
      const currentUser = localStorage.getItem("Current_User");
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        if (parsedUser?.type === "user") {
          navigate("/");
        } else {
          navigate("/admin/dashboard");
        }
      } else {
        // Handle case where no user data exists
        navigate("/"); // or wherever you want to redirect unauthenticated users
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/"); // fallback redirect
    }
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        component={"img"}
        src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg"
        width={"320px"}
        height={"320px"}
      ></Box>
      <Box>
        <Typography
          sx={{
            fontSize: {
              xs: "1rem", // ~ h6
              sm: "1.5rem", // ~ h5
              md: "2rem", // ~ h4
            },
          }}
        >
          Oops! Page not found
        </Typography>
      </Box>
      <Box>
        <Typography
          my={"15px"}
          variant="body2"
          fontSize={{
            xs: "12px",
            sm: "14px",
            md: "16px",
          }}
          color="text.secondary"
        >
          The page you are looking for doesn’t exist or has been moved.
        </Typography>
      </Box>
      <Box>
        <Button
          onClick={redirectToHome}
          size="medium"
          sx={{
            mt: "10px",
            bgcolor: "rgb(104, 81, 255)",
          }}
          variant="contained"
          fullWidth
        >
          Go To Homepage
        </Button>{" "}
      </Box>
    </Stack>
  );
};

export default NotFoundError;
