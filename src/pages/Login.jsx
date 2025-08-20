import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Person,
  Lock,
  Visibility,
  VisibilityOff,
  SwitchAccount,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../utils/auth"; // ✅ FIX: Import added

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("owner");
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const handleLogin = () => {
    setAuth({ token: "dummy-token", role }); // ✅ now works
    navigate("/"); // redirect to home (Layout decides menu)
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: theme.spacing(2),
        background: `linear-gradient(to bottom, ${theme.palette.grey[50]}, ${theme.palette.grey[200]})`,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: theme.spacing(5),
          borderRadius: 3,
          width: "100%",
          maxWidth: 420,
          boxShadow: `0px 10px 20px rgba(0, 0, 0, 0.1)`,
        }}
      >
        <Stack spacing={4}>
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            color="text.primary"
            sx={{ mb: 1 }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Please sign in as a {role} to continue
          </Typography>

          {/* Username Field */}
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="action"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: 2,
              p: "14px",
              borderRadius: 50,
              fontWeight: "bold",
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Login as {role}
          </Button>

          {/* Switch Role */}
          <Tooltip
            title={`Switch to the ${
              role === "owner" ? "Super Admin" : "Owner"
            } account type.`}
          >
            <Button
              fullWidth
              variant="text"
              onClick={() => setRole(role === "owner" ? "superadmin" : "owner")}
              sx={{ mt: 1, color: "text.secondary" }}
              startIcon={<SwitchAccount color="action" />}
            >
              Switch to {role === "owner" ? "Super Admin" : "Owner"}
            </Button>
          </Tooltip>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
