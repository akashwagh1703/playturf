import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Switch,
  FormControlLabel,
} from "@mui/material";

const AdminSettings = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        🛠 Super Admin Settings
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          {/* Platform Commission */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Platform Commission (%)"
              type="number"
              variant="outlined"
            />
          </Grid>

          {/* Support Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Support Email"
              type="email"
              variant="outlined"
            />
          </Grid>

          {/* Default Currency */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Default Currency" variant="outlined" />
          </Grid>

          {/* Enable Owner Approvals */}
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Switch />}
              label="Enable Owner Account Approval Flow"
            />
          </Grid>

          {/* Max Owners */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Max Owners Allowed"
              type="number"
              variant="outlined"
            />
          </Grid>

          {/* Maintenance Mode */}
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Switch />}
              label="Enable Maintenance Mode"
            />
          </Grid>

          {/* Save Button */}
          <Grid item xs={12}>
            <Box textAlign="right">
              <Button variant="contained" color="primary">
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AdminSettings;
