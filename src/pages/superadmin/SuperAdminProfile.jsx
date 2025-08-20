import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  Divider,
} from "@mui/material";

const SuperAdminProfile = () => {
  const [profile, setProfile] = useState({
    name: "Ankit Verma",
    email: "superadmin@example.com",
    phone: "+91 9123456780",
    role: "Super Admin",
    permissions: "Manage Owners, Manage Turfs, Reports",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 3, maxWidth: 800, mx: "auto" }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={3} textAlign="center">
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "secondary.main",
              mx: "auto",
            }}
          >
            {profile.name[0]}
          </Avatar>
          <Button size="small" sx={{ mt: 1 }} variant="outlined">
            Change Photo
          </Button>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            My Profile (Super Admin)
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={profile.role}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Permissions"
                name="permissions"
                value={profile.permissions}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button variant="contained" sx={{ mt: 3 }}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SuperAdminProfile;
