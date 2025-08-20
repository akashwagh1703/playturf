// src/pages/owner/AddBooking.jsx

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Grid,
  Stack,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  AddCircleOutline,
  Person,
  Payments,
  AccessTime,
  EventNote,
} from "@mui/icons-material";
import { bookings } from "../../data/mockData";

const AddBooking = () => {
  const [form, setForm] = useState({
    date: "",
    time: "",
    customer: "",
    payment_type: "",
    amount: "",
  });
  const [list, setList] = useState(bookings);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = "Date is required.";
    if (!form.time) newErrors.time = "Time is required.";
    if (!form.customer) newErrors.customer = "Customer name is required.";
    if (!form.payment_type)
      newErrors.payment_type = "Payment type is required.";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      newErrors.amount = "A valid amount is required.";
    }

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

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const conflict = list.find(
      (b) => b.date === form.date && b.time === form.time
    );

    if (conflict) {
      setLoading(false);
      setSnackbar({
        open: true,
        message: "This slot is already booked!",
        severity: "warning",
      });
      return;
    }

    const newBooking = {
      id: list.length + 1,
      ...form,
      type: "offline",
      status: "confirmed",
    };

    setList([...list, newBooking]);
    setForm({
      date: "",
      time: "",
      customer: "",
      payment_type: "",
      amount: "",
    });
    setLoading(false);
    setSnackbar({
      open: true,
      message: "Booking added successfully! 🎉",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        align="center"
        color="primary"
      >
        Add Offline Booking
      </Typography>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          {/* Date & Time Pickers */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Booking Date"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date}
                InputProps={{
                  startAdornment: (
                    <EventNote sx={{ color: "action.active", mr: 1 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Booking Time"
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                error={!!errors.time}
                helperText={errors.time}
                InputProps={{
                  startAdornment: (
                    <AccessTime sx={{ color: "action.active", mr: 1 }} />
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Divider />

          {/* Customer & Payment */}
          <TextField
            label="Customer Name"
            name="customer"
            value={form.customer}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.customer}
            helperText={errors.customer}
            InputProps={{
              startAdornment: <Person sx={{ color: "action.active", mr: 1 }} />,
            }}
          />
          <TextField
            select
            label="Payment Type"
            name="payment_type"
            value={form.payment_type}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.payment_type}
            helperText={errors.payment_type}
            InputProps={{
              startAdornment: (
                <Payments sx={{ color: "action.active", mr: 1 }} />
              ),
            }}
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="upi">UPI</MenuItem>
            <MenuItem value="online">Online</MenuItem>
          </TextField>
          <TextField
            label="Amount (₹)"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.amount}
            helperText={errors.amount}
            InputProps={{
              startAdornment: (
                <Typography variant="body1" color="text.secondary" mr={1}>
                  ₹
                </Typography>
              ),
            }}
          />
        </Stack>
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 4, py: 1.5 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <>
              <AddCircleOutline sx={{ mr: 1 }} />
              Add Booking
            </>
          )}
        </Button>
      </Paper>
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
    </Box>
  );
};

export default AddBooking;
