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
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Settings,
  LocationOn,
  AttachMoney,
  Notifications,
  Policy,
  Share,
  Link,
  SportsSoccer,
  Save,
  Phone,
  Email,
  Person,
  Work,
  CameraAlt,
  InfoOutlined,
  Business,
  Cake,
} from "@mui/icons-material";

// A custom TabPanel component to hide/show content based on the active tab
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
};

// Helper function for accessibility props
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const OwnerProfile = () => {
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState(0);

  // State for business settings form data
  const [settings, setSettings] = useState({
    turfName: "",
    contactNumber: "",
    email: "",
    address: "",
    openingTime: "",
    closingTime: "",
    slotDuration: "60",
    slotPrice: "",
    peakHourPrice: "",
    holidayDate: "",
    cancellationPolicy: "",
    notificationsEnabled: true,
    autoConfirmation: true,
    socialInstagram: "",
    socialFacebook: "",
    turfWebsite: "",
    availableSports: ["Football"],
    logoUrl: "",
  });

  // State for personal profile form data
  const [profile, setProfile] = useState({
    name: "Ravi Sharma",
    email: "owner@example.com",
    phone: "+91 9876543210",
    businessName: "PlayTurf Arena",
    location: "Pune, Maharashtra",
    avatarUrl: "",
    about: "Passionate about sports and providing a top-notch experience for athletes.",
    dob: "1990-05-15",
  });

  // State for form validation/alerts
  const [alert, setAlert] = useState(null);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle settings input changes
  const handleSettingsChange = (e) => {
    const { name, value, checked, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle profile input changes
  const handleProfileChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle sport selection changes
  const handleSportsChange = (e) => {
    const { value } = e.target;
    setSettings((prev) => ({
      ...prev,
      availableSports: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 0) {
      if (!profile.name || !profile.email || !profile.phone) {
        setAlert({ severity: "error", message: "Please fill in all required profile fields." });
        return;
      }
      setAlert({ severity: "success", message: "Profile saved successfully!" });
      console.log("Saving profile...", profile);
    } else {
      if (!settings.turfName || !settings.contactNumber || !settings.openingTime || !settings.closingTime || !settings.slotPrice) {
        setAlert({ severity: "error", message: "Please fill in all required settings fields." });
        return;
      }
      setAlert({ severity: "success", message: "Settings saved successfully!" });
      console.log("Saving settings...", settings);
    }
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
            Owner Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your personal profile and business settings
          </Typography>
        </Box>
      </Fade>

      {/* Main Content Paper */}
      <Paper sx={{ p: 0, borderRadius: 3, overflow: 'hidden' }}>
        {/* Tabs for Profile and Settings */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: alpha(theme.palette.primary.light, 0.1) }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="settings tabs" centered>
            <Tab label="My Profile" icon={<Person />} iconPosition="start" {...a11yProps(0)} />
            <Tab label="Business Settings" icon={<Settings />} iconPosition="start" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Alert message container */}
          {alert && (
            <Fade in timeout={500}>
              <Box mb={3} mt={3} px={3}>
                <Alert severity={alert.severity} onClose={() => setAlert(null)}>
                  {alert.message}
                </Alert>
              </Box>
            </Fade>
          )}

          {/* Profile Tab Panel */}
          <TabPanel value={activeTab} index={0}>
            <Grow in timeout={800}>
              <Grid container spacing={4}>
                {/* Profile Information Section */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                      <Person color="primary" />
                      <Typography variant="h6" fontWeight="600">
                        Personal Information
                      </Typography>
                    </Stack>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                        <Avatar
                          sx={{
                            width: 100,
                            height: 100,
                            bgcolor: "primary.main",
                            mx: { xs: 'auto', sm: 0 },
                            mb: 2,
                            fontSize: 48,
                            border: `4px solid ${theme.palette.primary.main}`,
                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                          }}
                        >
                          {profile.name ? profile.name[0] : <Person />}
                        </Avatar>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<CameraAlt />}
                          sx={{ borderRadius: 2 }}
                        >
                          Change Photo
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Stack spacing={3}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            variant="outlined"
                            required
                          />
                          <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            variant="outlined"
                            type="email"
                            InputProps={{ startAdornment: <InputAdornment position="start"><Email /></InputAdornment> }}
                            required
                          />
                          <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            variant="outlined"
                            type="tel"
                            InputProps={{ startAdornment: <InputAdornment position="start"><Phone /></InputAdornment> }}
                            required
                          />
                          <TextField
                            fullWidth
                            label="Date of Birth"
                            name="dob"
                            value={profile.dob}
                            onChange={handleProfileChange}
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ startAdornment: <InputAdornment position="start"><Cake /></InputAdornment> }}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Business and About Section */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
                    <Stack spacing={3}>
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                          <Business color="primary" />
                          <Typography variant="h6" fontWeight="600">
                            Business Details
                          </Typography>
                        </Stack>
                        <Divider sx={{ mb: 3 }} />
                        <Stack spacing={3}>
                          <TextField
                            fullWidth
                            label="Business Name"
                            name="businessName"
                            value={profile.businessName}
                            onChange={handleProfileChange}
                            variant="outlined"
                          />
                          <TextField
                            fullWidth
                            label="City/Location"
                            name="location"
                            value={profile.location}
                            onChange={handleProfileChange}
                            variant="outlined"
                            InputProps={{ startAdornment: <InputAdornment position="start"><LocationOn /></InputAdornment> }}
                          />
                        </Stack>
                      </Box>
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                          <InfoOutlined color="primary" />
                          <Typography variant="h6" fontWeight="600">
                            About Me
                          </Typography>
                        </Stack>
                        <Divider sx={{ mb: 3 }} />
                        <TextField
                          fullWidth
                          label="Tell us a little about yourself"
                          name="about"
                          value={profile.about}
                          onChange={handleProfileChange}
                          variant="outlined"
                          multiline
                          rows={4}
                          helperText="This description will be visible on your public turf page."
                        />
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </Grow>
          </TabPanel>

          {/* Business Settings Tab Panel */}
          <TabPanel value={activeTab} index={1}>
            <Grow in timeout={1000}>
              <Grid container spacing={3}>
                {/* General & Contact Information Section */}
                <Grid item xs={12} md={6}>
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
                        onChange={handleSettingsChange}
                        variant="outlined"
                        required
                      />
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={settings.address}
                        onChange={handleSettingsChange}
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
                        onChange={handleSettingsChange}
                        variant="outlined"
                        type="tel"
                        required
                        InputProps={{ startAdornment: <InputAdornment position="start"><Phone /></InputAdornment> }}
                      />
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={settings.email}
                        onChange={handleSettingsChange}
                        variant="outlined"
                        type="email"
                        InputProps={{ startAdornment: <InputAdornment position="start"><Email /></InputAdornment> }}
                      />
                    </Stack>
                  </Paper>
                </Grid>

                {/* Booking & Pricing Section */}
                <Grid item xs={12} md={6}>
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
                            onChange={handleSettingsChange}
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
                            onChange={handleSettingsChange}
                            type="time"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            required
                          />
                        </Grid>
                      </Grid>
                      <FormControl fullWidth>
                        <InputLabel id="slot-duration-label">Slot Duration</InputLabel>
                        <Select
                          labelId="slot-duration-label"
                          label="Slot Duration"
                          name="slotDuration"
                          value={settings.slotDuration}
                          onChange={handleSettingsChange}
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
                        onChange={handleSettingsChange}
                        type="number"
                        variant="outlined"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                          endAdornment: <InputAdornment position="end">/ slot</InputAdornment>,
                        }}
                        required
                      />
                      <TextField
                        fullWidth
                        label="Peak Hour Price (per booking)"
                        name="peakHourPrice"
                        value={settings.peakHourPrice}
                        onChange={handleSettingsChange}
                        type="number"
                        variant="outlined"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                          endAdornment: <InputAdornment position="end">/ slot</InputAdornment>,
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
                          onChange={handleSettingsChange}
                          type="date"
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Tooltip>
                    </Stack>
                  </Paper>
                </Grid>

                {/* Business & Booking Rules Section */}
                <Grid item xs={12} md={6}>
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
                            onChange={handleSettingsChange}
                            name="autoConfirmation"
                            color="primary"
                          />
                        }
                        label={
                          <Typography>
                            Automatically Confirm Bookings
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.notificationsEnabled}
                            onChange={handleSettingsChange}
                            name="notificationsEnabled"
                            color="primary"
                          />
                        }
                        label={
                          <Typography>
                            Enable Booking Notifications
                          </Typography>
                        }
                      />
                      <Tooltip title="Allow users to book specific sports" arrow>
                        <FormControl fullWidth>
                          <InputLabel id="available-sports-label">Available Sports</InputLabel>
                          <Select
                            labelId="available-sports-label"
                            label="Available Sports"
                            name="availableSports"
                            multiple
                            value={settings.availableSports}
                            onChange={handleSportsChange}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                          >
                            <MenuItem value="Football"><SportsSoccer sx={{ mr: 1 }} /> Football</MenuItem>
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
                        onChange={handleSettingsChange}
                        variant="outlined"
                        multiline
                        rows={3}
                      />
                    </Stack>
                  </Paper>
                </Grid>

                {/* Marketing & Branding Section */}
                <Grid item xs={12} md={6}>
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
                        onChange={handleSettingsChange}
                        variant="outlined"
                        InputProps={{ startAdornment: <InputAdornment position="start"><Link /></InputAdornment> }}
                      />
                      <TextField
                        fullWidth
                        label="Instagram Profile"
                        name="socialInstagram"
                        value={settings.socialInstagram}
                        onChange={handleSettingsChange}
                        variant="outlined"
                        InputProps={{ startAdornment: <InputAdornment position="start">@</InputAdornment> }}
                      />
                      <TextField
                        fullWidth
                        label="Facebook Page URL"
                        name="socialFacebook"
                        value={settings.socialFacebook}
                        onChange={handleSettingsChange}
                        variant="outlined"
                        InputProps={{ startAdornment: <InputAdornment position="start"><Link /></InputAdornment> }}
                      />
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </Grow>
          </TabPanel>

          {/* Save Button */}
          <Box textAlign="right" sx={{ p: { xs: 2, md: 3 } }}>
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
                  boxShadow: `0 3px 5px 2px ${alpha(theme.palette.primary.main, 0.3)}`,
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default OwnerProfile;
