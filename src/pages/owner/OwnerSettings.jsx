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
  Stack,
  Divider,
  Fade,
  Grow,
  useTheme,
  alpha,
  Tooltip,
  InputAdornment,
  Alert,
  IconButton,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  Settings,
  LocationOn,
  Schedule,
  AttachMoney,
  Notifications,
  Policy,
  Share,
  Image,
  Link,
  AccessTime,
  SportsSoccer,
  Save,
  InfoOutlined,
  Email,
} from "@mui/icons-material";
import { Phone } from "lucide-react";

const OwnerSettings = () => {
  const theme = useTheme();

  // State to manage form data
  const [settings, setSettings] = useState({
    turfName: "",
    contactNumber: "",
    email: "",
    address: "",
    openingTime: "",
    closingTime: "",
    slotDuration: "60", // Default to 60 minutes
    slotPrice: "",
    peakHourPrice: "",
    holidayDate: "",
    cancellationPolicy: "",
    notificationsEnabled: true,
    autoConfirmation: true,
    socialInstagram: "",
    socialFacebook: "",
    turfWebsite: "",
    availableSports: ["Football"], // Array of available sports
    logoUrl: "",
  });

  // State for form validation/alerts
  const [alert, setAlert] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle sport selection changes
  const handleSportsChange = (e) => {
    const { value } = e.target;
    setSettings((prev) => ({
      ...prev,
      availableSports: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (
      !settings.turfName ||
      !settings.contactNumber ||
      !settings.openingTime ||
      !settings.closingTime ||
      !settings.slotPrice
    ) {
      setAlert({
        severity: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }
    setAlert({ severity: "success", message: "Settings saved successfully!" });
    console.log("Saving changes...", settings);
    // In a real application, you would send this data to a backend API
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        bgcolor: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header Section */}
      <Fade in timeout={800}>
        <Box mb={4}>
          <Typography
            variant="h4"
            fontWeight="700"
            color="text.primary"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Owner Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your turf's profile, pricing, and operational settings
          </Typography>
        </Box>
      </Fade>

      {/* Alert message container */}
      {alert && (
        <Fade in timeout={500}>
          <Box mb={3}>
            <Alert severity={alert.severity} onClose={() => setAlert(null)}>
              {alert.message}
            </Alert>
          </Box>
        </Fade>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* General & Contact Information Section */}
          <Grid item xs={12} md={6}>
            <Grow in timeout={800}>
              <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <LocationOn color="primary" />
                  <Typography variant="h6" fontWeight="600">
                    General Information
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Turf Name"
                    name="turfName"
                    value={settings.turfName}
                    onChange={handleChange}
                    variant="outlined"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={2}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contactNumber"
                    value={settings.contactNumber}
                    onChange={handleChange}
                    variant="outlined"
                    type="tel"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    variant="outlined"
                    type="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Paper>
            </Grow>
          </Grid>

          {/* Booking & Pricing Section */}
          <Grid item xs={12} md={6}>
            <Grow in timeout={1000}>
              <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <AttachMoney color="primary" />
                  <Typography variant="h6" fontWeight="600">
                    Booking & Pricing
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Opening Time"
                        name="openingTime"
                        value={settings.openingTime}
                        onChange={handleChange}
                        type="time"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Closing Time"
                        name="closingTime"
                        value={settings.closingTime}
                        onChange={handleChange}
                        type="time"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    </Grid>
                  </Grid>
                  <FormControl fullWidth>
                    <InputLabel id="slot-duration-label">
                      Slot Duration
                    </InputLabel>
                    <Select
                      labelId="slot-duration-label"
                      label="Slot Duration"
                      name="slotDuration"
                      value={settings.slotDuration}
                      onChange={handleChange}
                    >
                      <MenuItem value="30">30 minutes</MenuItem>
                      <MenuItem value="60">60 minutes</MenuItem>
                      <MenuItem value="90">90 minutes</MenuItem>
                      <MenuItem value="120">120 minutes</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Default Slot Price (per booking)"
                    name="slotPrice"
                    value={settings.slotPrice}
                    onChange={handleChange}
                    type="number"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">/ slot</InputAdornment>
                      ),
                    }}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Peak Hour Price (per booking)"
                    name="peakHourPrice"
                    value={settings.peakHourPrice}
                    onChange={handleChange}
                    type="number"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">/ slot</InputAdornment>
                      ),
                    }}
                  />
                  <Tooltip
                    title="Block out a specific date for maintenance or a holiday"
                    arrow
                    placement="top"
                  >
                    <TextField
                      fullWidth
                      label="Holiday/Closure Date"
                      name="holidayDate"
                      value={settings.holidayDate}
                      onChange={handleChange}
                      type="date"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Tooltip>
                </Stack>
              </Paper>
            </Grow>
          </Grid>

          {/* Business & Booking Rules Section */}
          <Grid item xs={12} md={6}>
            <Grow in timeout={1200}>
              <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Policy color="primary" />
                  <Typography variant="h6" fontWeight="600">
                    Business Rules
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.autoConfirmation}
                        onChange={handleChange}
                        name="autoConfirmation"
                        color="primary"
                      />
                    }
                    label={
                      <Typography>Automatically Confirm Bookings</Typography>
                    }
                  />
                  <Tooltip title="Allow users to book specific sports" arrow>
                    <FormControl fullWidth>
                      <InputLabel id="available-sports-label">
                        Available Sports
                      </InputLabel>
                      <Select
                        labelId="available-sports-label"
                        label="Available Sports"
                        name="availableSports"
                        multiple
                        value={settings.availableSports}
                        onChange={handleSportsChange}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        <MenuItem value="Football">
                          <SportsSoccer sx={{ mr: 1 }} /> Football
                        </MenuItem>
                        <MenuItem value="Cricket">Cricket</MenuItem>
                        <MenuItem value="Badminton">Badminton</MenuItem>
                        <MenuItem value="Basketball">Basketball</MenuItem>
                      </Select>
                    </FormControl>
                  </Tooltip>
                  <TextField
                    fullWidth
                    label="Cancellation Policy"
                    name="cancellationPolicy"
                    value={settings.cancellationPolicy}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                </Stack>
              </Paper>
            </Grow>
          </Grid>

          {/* Marketing & Branding Section */}
          <Grid item xs={12} md={6}>
            <Grow in timeout={1400}>
              <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Share color="primary" />
                  <Typography variant="h6" fontWeight="600">
                    Marketing & Branding
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Website URL"
                    name="turfWebsite"
                    value={settings.turfWebsite}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Link />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Instagram Profile"
                    name="socialInstagram"
                    value={settings.socialInstagram}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">@</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Facebook Page URL"
                    name="socialFacebook"
                    value={settings.socialFacebook}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Link />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Paper>
            </Grow>
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box textAlign="right" mt={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<Save />}
            sx={{
              p: "12px 32px",
              borderRadius: 2,
              fontWeight: "bold",
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 3px 5px 2px ${alpha(
                  theme.palette.primary.main,
                  0.3
                )}`,
              },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default OwnerSettings;
