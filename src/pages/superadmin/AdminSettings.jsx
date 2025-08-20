import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  MonetizationOn as MonetizationOnIcon,
  People as PeopleIcon,
  LocalMall as LocalMallIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

const AdminSettings = () => {
  // State to hold all platform settings
  const [settings, setSettings] = useState({
    // General Settings
    platformCommission: 10,
    supportEmail: "support@example.com",
    defaultCurrency: "INR",
    // User Management
    enableOwnerApproval: true,
    requirePlayerVerification: false,
    maxOwners: 500,
    // Booking & Revenue
    minBookingDuration: 30, // in minutes
    ownerSubscriptionModel: "free", // "free", "premium"
    ownerDiscountRate: 5, // %
    // System
    maintenanceMode: false,
    systemStatusMessage: "The platform is operating normally.",
  });

  // Handler for all setting changes
  const handleSettingsChange = (e) => {
    const { name, value, checked, type } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle saving changes
  const handleSave = () => {
    console.log("Saving new settings:", settings);
    // In a real application, you would send this to a backend API
    // e.g., axios.post('/api/admin/settings', settings);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f5f5f5" }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={4}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <SettingsIcon color="primary" sx={{ mr: 1 }} />
        Super Admin Settings
      </Typography>

      <Grid container spacing={4}>
        {/* General Platform Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardHeader
              title="General Settings"
              avatar={<SettingsIcon />}
              sx={{ bgcolor: "#fafafa", borderBottom: "1px solid #eee" }}
            />
            <CardContent>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Platform Commission (%)"
                  name="platformCommission"
                  type="number"
                  value={settings.platformCommission}
                  onChange={handleSettingsChange}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Support Email"
                  name="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={handleSettingsChange}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Default Currency"
                  name="defaultCurrency"
                  value={settings.defaultCurrency}
                  onChange={handleSettingsChange}
                  variant="outlined"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* User & Approval Management */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardHeader
              title="User & Approval Management"
              avatar={<PeopleIcon />}
              sx={{ bgcolor: "#fafafa", borderBottom: "1px solid #eee" }}
            />
            <CardContent>
              <Stack spacing={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableOwnerApproval}
                      onChange={handleSettingsChange}
                      name="enableOwnerApproval"
                    />
                  }
                  label="Enable Owner Account Approval Flow"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.requirePlayerVerification}
                      onChange={handleSettingsChange}
                      name="requirePlayerVerification"
                    />
                  }
                  label="Require Player Profile Verification"
                />
                <TextField
                  fullWidth
                  label="Max Owners Allowed"
                  name="maxOwners"
                  type="number"
                  value={settings.maxOwners}
                  onChange={handleSettingsChange}
                  variant="outlined"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Booking & Revenue Controls */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardHeader
              title="Booking & Revenue Controls"
              avatar={<MonetizationOnIcon />}
              sx={{ bgcolor: "#fafafa", borderBottom: "1px solid #eee" }}
            />
            <CardContent>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Minimum Booking Duration (min)"
                  name="minBookingDuration"
                  type="number"
                  value={settings.minBookingDuration}
                  onChange={handleSettingsChange}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Owner Subscription Model"
                  name="ownerSubscriptionModel"
                  value={settings.ownerSubscriptionModel}
                  onChange={handleSettingsChange}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Owner Discount Rate (%)"
                  name="ownerDiscountRate"
                  type="number"
                  value={settings.ownerDiscountRate}
                  onChange={handleSettingsChange}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* System Health & Status */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardHeader
              title="System Health & Status"
              avatar={<WarningIcon />}
              sx={{ bgcolor: "#fafafa", borderBottom: "1px solid #eee" }}
            />
            <CardContent>
              <Stack spacing={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.maintenanceMode}
                      onChange={handleSettingsChange}
                      name="maintenanceMode"
                    />
                  }
                  label="Enable Maintenance Mode"
                />
                <TextField
                  fullWidth
                  label="System Status Message"
                  name="systemStatusMessage"
                  value={settings.systemStatusMessage}
                  onChange={handleSettingsChange}
                  variant="outlined"
                  multiline
                  rows={2}
                  helperText="This message is visible to all users on the platform."
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Divider sx={{ my: 4 }} />
          <Box textAlign="right">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save All Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminSettings;
