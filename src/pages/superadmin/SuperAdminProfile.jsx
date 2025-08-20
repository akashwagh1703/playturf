import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  Divider,
  Box,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  VerifiedUser,
  Security,
  Lock,
  Close,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const SuperAdminProfile = () => {
  const theme = useTheme();
  // State for profile details, with a more robust structure
  const [profile, setProfile] = useState({
    name: "Ankit Verma",
    email: "superadmin@example.com",
    phone: "+91 9123456780",
    role: "Super Admin",
    isAccountActive: true,
    permissions: ["Manage Owners", "Manage Turfs", "View Reports"],
  });

  // State for password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Handler for all profile field changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handler for password field changes
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // Handler for saving all profile changes
  const handleSave = () => {
    console.log("Saving profile changes:", profile);
    // In a real application, you would send this data to an API
  };

  // Handler for password change submission
  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }
    setPasswordError(""); // Clear any previous errors
    console.log("Changing password for user:", profile.email);
    console.log("New password:", passwordForm.newPassword);
    // In a real app, send the password change request to the backend
    setOpenPasswordDialog(false);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: theme.palette.grey[100],
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, maxWidth: 900, mx: "auto" }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          color="text.primary"
        >
          My Profile & Settings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Manage your personal information, account status, and security
          settings.
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {/* Profile Details Section */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={3} textAlign="center">
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: theme.palette.primary.main,
                mx: "auto",
                border: `3px solid ${theme.palette.grey[300]}`,
              }}
            >
              <Typography variant="h3" fontWeight="bold">
                {profile.name[0]}
              </Typography>
            </Avatar>
            <Button size="small" sx={{ mt: 2 }} variant="outlined">
              Change Photo
            </Button>
          </Grid>

          <Grid item xs={12} md={9}>
            <Stack spacing={3}>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Personal Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Role"
                    name="role"
                    value={profile.role}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VerifiedUser color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Security & Permissions Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Account Status
              </Typography>
              <Box>
                <Typography variant="body1">
                  Your account is currently:
                </Typography>
                <Chip
                  icon={<VerifiedUser />}
                  label={profile.isAccountActive ? "Active" : "Inactive"}
                  color={profile.isAccountActive ? "success" : "error"}
                  sx={{ mt: 1, fontWeight: "bold" }}
                />
              </Box>
              <Typography variant="body1" fontWeight="bold">
                Permissions:
              </Typography>
              <Box>
                <Stack direction="row" flexWrap="wrap" spacing={1}>
                  {profile.permissions.map((permission, index) => (
                    <Chip key={index} label={permission} variant="outlined" />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Account Security
              </Typography>
              <Button
                variant="contained"
                startIcon={<Lock />}
                onClick={() => setOpenPasswordDialog(true)}
              >
                Change Password
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: "right" }}>
          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Paper>

      {/* Change Password Dialog */}
      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            Change Your Password
            <IconButton
              onClick={() => setOpenPasswordDialog(false)}
              size="small"
            >
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Current Password"
              name="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              value={passwordForm.confirmNewPassword}
              onChange={handlePasswordChange}
              variant="outlined"
              error={!!passwordError}
              helperText={passwordError}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenPasswordDialog(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            color="primary"
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SuperAdminProfile;
