// src/pages/owner/AddTurf.jsx

import React, { useState, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Chip,
  Stack,
  InputAdornment,
  IconButton,
  CardMedia,
  Container,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import {
  AddPhotoAlternate,
  Delete,
  SportsSoccer,
  LocationOn,
  CurrencyRupee,
  CheckCircle,
  PhotoCamera,
  LocalParking,
  WbSunny,
  Wc,
  LocalDrink,
  Chair,
  FitnessCenter,
} from "@mui/icons-material";

// Mock data for form options and initial list
const commonFacilities = [
  { name: "Parking", icon: <LocalParking /> },
  { name: "Floodlights", icon: <WbSunny /> },
  { name: "Washrooms", icon: <Wc /> },
  { name: "Drinking Water", icon: <LocalDrink /> },
  { name: "Seating Area", icon: <Chair /> },
  { name: "Changing Rooms", icon: <FitnessCenter /> },
];

const mockTurfs = [
  { id: 1, name: "City Stadium Turf", location: "Mumbai, India" },
  { id: 2, name: "Green Field Park", location: "Pune, India" },
];

const AddTurf = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    size: "",
    pitches: "",
    priceDay: "",
    priceNight: "",
    facilities: [],
    notes: "",
    images: [],
  });
  const [turfList, setTurfList] = useState(mockTurfs);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleToggleFacility = useCallback((facility) => {
    setForm((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  }, []);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // In a real app, you would upload files to a storage service (e.g., Firebase Storage)
    // For this example, we'll create object URLs.
    const uploadedUrls = files.map((file) => URL.createObjectURL(file));

    setForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    setSnackbar({
      open: true,
      message: `${files.length} image(s) selected successfully!`,
      severity: "success",
    });
  };

  const handleRemoveImage = useCallback((idx) => {
    setForm((prev) => {
      // Clean up the object URL to free memory
      URL.revokeObjectURL(prev.images[idx]);
      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== idx),
      };
    });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Turf name is required.";
    if (!form.location.trim()) newErrors.location = "Location is required.";
    if (!form.priceDay || isNaN(form.priceDay) || Number(form.priceDay) <= 0)
      newErrors.priceDay = "A valid day price is required.";
    if (
      !form.priceNight ||
      isNaN(form.priceNight) ||
      Number(form.priceNight) <= 0
    )
      newErrors.priceNight = "A valid night price is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fill out all required fields.",
        severity: "error",
      });
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newTurf = { id: turfList.length + 1, ...form };
    setTurfList((prev) => [newTurf, ...prev]);
    setForm({
      name: "",
      location: "",
      size: "",
      pitches: "",
      priceDay: "",
      priceNight: "",
      facilities: [],
      notes: "",
      images: [],
    });
    setIsSubmitting(false);
    setSnackbar({
      open: true,
      message: "Turf added successfully! 🎉",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <SportsSoccer color="primary" sx={{ fontSize: 48 }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Add a New Turf
        </Typography>
      </Stack>

      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
        <Stack spacing={4}>
          {/* Basic Information */}
          <Box>
            <Typography variant="h6" mb={2} fontWeight="bold">
              Basic Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Turf Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  error={!!errors.location}
                  helperText={errors.location}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Turf Size (e.g., 5-a-side)"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Number of Pitches"
                  name="pitches"
                  value={form.pitches}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Pricing */}
          <Box>
            <Typography variant="h6" mb={2} fontWeight="bold">
              Pricing
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Day Price (₹)"
                  name="priceDay"
                  value={form.priceDay}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                  variant="outlined"
                  required
                  error={!!errors.priceDay}
                  helperText={errors.priceDay}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Night Price (₹)"
                  name="priceNight"
                  value={form.priceNight}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                  variant="outlined"
                  required
                  error={!!errors.priceNight}
                  helperText={errors.priceNight}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Facilities */}
          <Box>
            <Typography variant="h6" mb={2} fontWeight="bold">
              Facilities
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {commonFacilities.map(({ name, icon }) => (
                <Chip
                  key={name}
                  label={name}
                  icon={icon}
                  clickable
                  onClick={() => handleToggleFacility(name)}
                  color={form.facilities.includes(name) ? "primary" : "default"}
                  variant={
                    form.facilities.includes(name) ? "filled" : "outlined"
                  }
                />
              ))}
            </Stack>
          </Box>

          {/* Photos */}
          <Box>
            <Typography variant="h6" mb={2} fontWeight="bold">
              Photos
            </Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<AddPhotoAlternate />}
              sx={{ mb: 2 }}
            >
              Upload Images
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleFileUpload}
              />
            </Button>
            <Grid container spacing={2}>
              {form.images.map((img, i) => (
                <Grid item xs={6} sm={4} key={i}>
                  <Box
                    sx={{
                      position: "relative",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={img}
                      alt={`preview-${i}`}
                      sx={{ height: 100, objectFit: "cover" }}
                    />
                    <Tooltip title="Remove Image">
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(i)}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          bgcolor: "rgba(255,255,255,0.8)",
                        }}
                      >
                        <Delete fontSize="small" color="error" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Additional Notes */}
          <Box>
            <Typography variant="h6" mb={2} fontWeight="bold">
              Additional Notes
            </Typography>
            <TextField
              name="notes"
              value={form.notes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              placeholder="Add rules, restrictions, or important notes for customers..."
              variant="outlined"
            />
          </Box>
        </Stack>
      </Paper>

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={isSubmitting}
        size="large"
        fullWidth
        sx={{ mt: 4, py: 2 }}
      >
        <CheckCircle sx={{ mr: 1 }} />
        {isSubmitting ? "Adding Turf..." : "Add Turf to Marketplace"}
      </Button>

      {/* Turf Portfolio */}
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 4, borderRadius: 3 }}>
        <Typography variant="h5" mb={3} fontWeight="bold" color="primary.main">
          Your Turf Portfolio ({turfList.length})
        </Typography>
        <Grid container spacing={2}>
          {turfList.map((turf) => (
            <Grid item xs={12} sm={6} md={4} key={turf.id}>
              <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6">{turf.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {turf.location}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddTurf;
