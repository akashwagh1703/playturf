import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../utils/auth";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const Login = () => {
  const [role, setRole] = useState("owner");
  const navigate = useNavigate();

  const handleLogin = () => {
    setAuth({ token: "dummy-token", role });
    navigate("/"); // redirect to home (Layout decides menu)
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper elevation={3} sx={{ p: 4, width: 300 }}>
        <Typography variant="h6" mb={2}>
          Login
        </Typography>
        <TextField fullWidth label="Username" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login as {role}
        </Button>

        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => setRole(role === "owner" ? "superadmin" : "owner")}
        >
          Switch to {role === "owner" ? "Super Admin" : "Owner"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
