import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { auth, db, doc, setDoc } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailValue = (e) => {
    setEmail(e.target.value);
  };
  const handlePassValue = (e) => {
    setPassword(e.target.value);
  };
  const handleFNValue = (e) => {
    setFirstName(e.target.value);
  };
  const handleLNValue = (e) => {
    setLastName(e.target.value);
  };

  const signUPHandler = async () => {
    if (!email || !password) return;

    const userObj = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    try {
      setIsLoading(true);
      const authenticatedData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsLoading(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      toast.success("Account Created Successfully!", {
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

      // store user data to firestore database
      await setDoc(doc(db, "Users", authenticatedData.user.uid), userObj);
      navigate("/login");
    } catch (error) {
      console.warn("Signup Error -->", error.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
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

  const handleRedirectToLoginPage = () => {
    navigate("/login");
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
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
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
          <Typography variant="h4" sx={{ fontWeight: "600", mb: "10px" }}>
            Signup
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            New here? Sign up and start blogging in minutes{" "}
          </Typography>
        </Box>

        <Stack gap={"15px"} marginTop={"20px"}>
          <TextField
            value={firstName}
            onChange={handleFNValue}
            size="small"
            label="First Name"
            type="text"
            fullWidth
          />
          <TextField
            value={lastName}
            onChange={handleLNValue}
            size="small"
            label="Last Name"
            type="text"
          />
          <TextField
            value={email}
            onChange={handleEmailValue}
            size="small"
            label="Email"
            type="email"
          />
          <TextField
            value={password}
            onChange={handlePassValue}
            size="small"
            label="Password"
            type="password"
          />
          <Button
            onClick={signUPHandler}
            sx={{
              mt: "10px",
              bgcolor: "rgb(104, 81, 255)",
              textTransform: "capitalize",
            }}
            variant="contained"
            disabled={isLoading}
          >
            {isLoading && (
              <CircularProgress size="20px" color="white" sx={{ mr: "10px" }} />
            )}
            Create Account
          </Button>
        </Stack>

        <Typography sx={{ fontSize: "14px", mt: "20px" }} textAlign={"center"}>
          Already have an account?{" "}
          <Typography
            onClick={handleRedirectToLoginPage}
            component={"span"}
            color="rgb(104, 81, 255)"
            sx={{ cursor: "pointer", fontSize: "14px" }}
          >
            Login
          </Typography>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Signup;
