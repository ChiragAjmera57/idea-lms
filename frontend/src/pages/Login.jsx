import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import { studentsignUp } from "../utils/signup";
import { Modal } from "@mui/base";
import { useNavigate } from "react-router-dom";
import CourseList from "../components/Courseselection";
import { studentLogin } from "../utils/loginPost";
import { adminLogin } from "../utils/admin.login";

const style = {
  position: "absolute",
  zIndex: 100,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#e7e7e7",
  boxShadow: 50,
  p: 4,
};
const Login = () => {
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });
  const [studentCredentials, setStudentCredentials] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isStudentSignup, setStudentSignup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    if (token != null) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    }
  }, [navigate]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAdminChange = (e) => {
    setAdminCredentials({
      ...adminCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleStudentChange = (e) => {
    setStudentCredentials({
      ...studentCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdminLogin = () => {
    console.log("Admin Login:", adminCredentials);
    adminLogin(adminCredentials.email, adminCredentials.password)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("isAdmin", res.isAdmin);
        navigate("/admin");
      })
      .catch((err) => {
        setError(true);
        setloading(false)
        console.log(err);
      });
  };

  const handleStudentLogin = () => {
    console.log("Student Login:", studentCredentials);
    studentLogin(studentCredentials.email, studentCredentials.password)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("isAdmin", res.isAdmin);
        navigate("/student");
      })
      .catch((err) => {
        setError(true);
        setloading(false)
        console.log(err);
      });
  };
  const handleStudentSignup = () => {
    setloading(true);
    studentsignUp(
      studentCredentials.email,
      studentCredentials.name,
      studentCredentials.password
    ).then((res) => {
      console.log(res);
      setloading(false);
      localStorage.setItem("token", res.token);
      localStorage.setItem("isAdmin", res.isAdmin);
      handleOpen();
    })
    .catch((err)=>{
        setError(true)
        setloading(false)
    })
    
  };
  const courseAdded = () => {
    handleClose();
    navigate("/student");
  };
  return (
    <Container
      sx={{
        mt: "20px",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography variant="h5" align="center" gutterBottom>
              Admin Login
            </Typography>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={adminCredentials.email}
              onChange={handleAdminChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={adminCredentials.password}
              onChange={handleAdminChange}
              margin="normal"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleAdminLogin}
            >
              Login
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography variant="h5" align="center" gutterBottom>
              Student Login
            </Typography>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={studentCredentials.email}
              onChange={handleStudentChange}
              margin="normal"
            />
            {isStudentSignup ? (
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                type="text"
                name="name"
                // value={studentCredentials.password}
                onChange={handleStudentChange}
                margin="normal"
              />
            ) : (
              <></>
            )}
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={studentCredentials.password}
              onChange={handleStudentChange}
              margin="normal"
            />
            {isStudentSignup ? (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleStudentSignup}
              >
                {loading ? <CircularProgress /> : "Signup"}
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleStudentLogin}
              >
                Login
              </Button>
            )}
          </Paper>
          {isStudentSignup ? (
            <Box>
              already have account?{" "}
              <Box
                onClick={() => setStudentSignup(false)}
                sx={{ color: "blue" }}
              >
                Login
              </Box>
            </Box>
          ) : (
            <Box>
              Don't have an account?{" "}
              <Box
                onClick={() => setStudentSignup(true)}
                sx={{ color: "blue" }}
              >
                SignUp
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CourseList courseAdded={courseAdded} />
        </Box>
      </Modal>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={() => setError(false)}
      >
        <Alert
          onClose={() => setError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Something Went Wrong
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
