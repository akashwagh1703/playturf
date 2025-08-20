import React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Grid,
  Typography,
  Box,
  Paper,
  Divider,
  Stack,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  People as PeopleIcon,
  Workspaces as WorkspacesIcon,
  CalendarToday as CalendarTodayIcon,
  MonetizationOn as MonetizationOnIcon,
  HourglassEmpty as HourglassEmptyIcon,
  ListAlt as ListAltIcon,
  Stars as StarsIcon,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { dashboardMockData } from "../../data/superAdminData";

// This is the complete mock data object provided by the user

// Define a custom theme for the application
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // A deep blue
    },
    secondary: {
      main: "#ff4081", // A vibrant pink
    },
    success: {
      main: "#4caf50",
    },
    warning: {
      main: "#ff9800",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// A mapping to dynamically render Material-UI icons based on string names
const iconMapping = {
  CalendarToday: CalendarTodayIcon,
  Workspaces: WorkspacesIcon,
  People: PeopleIcon,
  MonetizationOn: MonetizationOnIcon,
  HourglassEmpty: HourglassEmptyIcon,
  ListAlt: ListAltIcon,
  Stars: StarsIcon,
};

// Main Super Admin Dashboard component
const SuperAdminDashboard = () => {
  const PIE_COLORS = [theme.palette.primary.main, theme.palette.secondary.main];

  // Helper function to get status color for chips
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "background.default",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header Section */}
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
          Super Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Platform-wide insights and management tools
        </Typography>
      </Box>

      {/* KPI Stats Cards Section */}
      <Grid container spacing={3} mb={4}>
        {dashboardMockData.kpiData.map((kpi, idx) => {
          const IconComponent = iconMapping[kpi.icon];
          return (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: kpi.color,
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box sx={{ mr: 2, color: "grey.800", opacity: 0.8 }}>
                  {IconComponent && (
                    <IconComponent fontSize="large" color="inherit" />
                  )}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {kpi.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" sx={{ mt: 0.5 }}>
                    {kpi.value}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Main Content: Charts & Tables */}
      <Grid container spacing={4}>
        {/* User Registration Trends Chart */}
        <Grid item xs={12} md={6} mb={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Monthly User Registrations
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={dashboardMockData.monthlyUserRegistrations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="players"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  name="Players"
                />
                <Line
                  type="monotone"
                  dataKey="owners"
                  stroke={theme.palette.secondary.main}
                  strokeWidth={2}
                  name="Owners"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Player vs. Owner Ratio Chart */}
        <Grid item xs={12} md={6} mb={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              User Role Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={dashboardMockData.userRoleData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {dashboardMockData.userRoleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Weekly Booking Trends Chart */}
        <Grid item xs={12} md={6} mb={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Weekly Booking Trends
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={dashboardMockData.bookingTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke={theme.palette.primary.main}
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Monthly Revenue Chart */}
        <Grid item xs={12} md={6} mb={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Monthly Revenue
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dashboardMockData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Bar
                  dataKey="revenue"
                  fill={theme.palette.success.main}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pending Owner Approvals Table */}
        <Grid item xs={12} md={6} mb={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <HourglassEmptyIcon color="warning" />
              <Typography variant="h6" fontWeight="bold">
                Pending Owner Approvals
              </Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Approval ID</TableCell>
                    <TableCell>Owner Name</TableCell>
                    <TableCell>Turf Name</TableCell>
                    <TableCell>Requested On</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardMockData.pendingApprovals.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.owner}</TableCell>
                      <TableCell>{row.turfName}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell align="right">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                          >
                            Reject
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Turf Performance Module */}
        <Grid item xs={12} md={6} mb={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <StarsIcon color="secondary" />
              <Typography variant="h6" fontWeight="bold">
                Top Performing Turfs
              </Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={dashboardMockData.turfPerformanceData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar
                  dataKey="bookings"
                  fill={theme.palette.secondary.main}
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Bookings Table */}
        <Grid item xs={12} md={6} mb={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <ListAltIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Recent Bookings
              </Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Turf</TableCell>
                    <TableCell>Player</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardMockData.recentBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.turf}</TableCell>
                      <TableCell>{booking.player}</TableCell>
                      <TableCell>{booking.amount}</TableCell>
                      <TableCell>
                        <Chip
                          label={booking.status}
                          color={getStatusColor(booking.status)}
                          size="small"
                          sx={{ fontWeight: "bold" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuperAdminDashboard;
