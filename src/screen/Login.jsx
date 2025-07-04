import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import "../App.css";
import { auth, db, doc, getDoc } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
const Login = () => {
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

  const loginHandler = async () => {
    if (!email || !password) return;
    try {
      setIsLoading(true);
      const data = await signInWithEmailAndPassword(auth, email, password);

      const uid = data.user.uid;

      const docSnap = await getDoc(doc(db, "Users", uid));

      if (docSnap.exists()) {
        const userInfo = { ...docSnap.data(), uid };

        localStorage.setItem("Current_User", JSON.stringify(userInfo));
        setEmail("");
        setPassword("");

        if (userInfo.type === "admin") {
          navigate("/admin/dashboard"); // Redirect to admin dashboard
        } else {
          navigate("/"); // Redirect to user homepage
        }
      }

      setIsLoading(false);

      toast.success("LoggedIn Successfully!", {
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
      console.warn("Signup Error -->", error.message);
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

  const handleRedirectToSignupPage = () => {
    navigate("/signup");
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
            lg: "32%",
          },
        }}
      >
        <Box sx={{ mb: "10px" }}>
          <Typography variant="h4" sx={{ fontWeight: "600", mb: "10px" }}>
            Login
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            Log in to create, manage, and explore amazing blogs
          </Typography>
        </Box>

        <Stack gap={"15px"} marginTop={"20px"}>
          <TextField
            value={email}
            onChange={handleEmailValue}
            size="small"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            value={password}
            onChange={handlePassValue}
            size="small"
            label="Password"
            type="password"
            fullWidth
          />

          <Button
            onClick={loginHandler}
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
            Login
          </Button>
        </Stack>
        <Box mt={"20px"}>
          <Typography sx={{ fontSize: "14px" }} textAlign={"center"}>
            Don't have an account?{" "}
            <Typography
              onClick={handleRedirectToSignupPage}
              component={"span"}
              color="rgb(104, 81, 255)"
              sx={{ cursor: "pointer", fontSize: "14px" }}
            >
              Create One
            </Typography>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Login;
