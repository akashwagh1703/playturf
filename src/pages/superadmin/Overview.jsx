import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import {
  People,
  SportsSoccer,
  CalendarToday,
  BarChart,
  MonetizationOn,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
} from "recharts";

const Overview = () => {
  const theme = useTheme();

  // Mock data
  const bookingTrends = [
    { day: "Mon", bookings: 12 },
    { day: "Tue", bookings: 19 },
    { day: "Wed", bookings: 7 },
    { day: "Thu", bookings: 14 },
    { day: "Fri", bookings: 22 },
    { day: "Sat", bookings: 30 },
    { day: "Sun", bookings: 25 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1800 },
    { month: "Mar", revenue: 2400 },
    { month: "Apr", revenue: 1600 },
  ];

  const stats = [
    {
      title: "Today's Bookings",
      value: 24,
      icon: <CalendarToday fontSize="large" color="primary" />,
      color: "#e3f2fd",
    },
    {
      title: "Live Booked",
      value: 6,
      icon: <SportsSoccer fontSize="large" color="success" />,
      color: "#e8f5e9",
    },
    {
      title: "Total Owners",
      value: 15,
      icon: <People fontSize="large" color="secondary" />,
      color: "#f3e5f5",
    },
    {
      title: "Revenue (₹)",
      value: "45,000",
      icon: <MonetizationOn fontSize="large" color="warning" />,
      color: "#fff8e1",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={2}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                bgcolor: stat.color,
                borderRadius: 3,
                boxShadow: 2,
                height: "100%",
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 350, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Weekly Booking Trends
              </Typography>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={bookingTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: 350, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Monthly Revenue
              </Typography>
              <ResponsiveContainer width="100%" height="80%">
                <ReBarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="revenue"
                    fill={theme.palette.success.main}
                    radius={[6, 6, 0, 0]}
                  />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
