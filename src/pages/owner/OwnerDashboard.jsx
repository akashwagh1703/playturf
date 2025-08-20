import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  Chip,
  Card,
  CardContent,
  Avatar,
  Stack,
  Fade,
  Grow,
  useTheme,
  alpha,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Pie, Bar, Doughnut, Line } from "react-chartjs-2";
import {
  EventAvailable,
  AttachMoney,
  TrendingUp,
  Today,
  AccessTime,
  MoreVert,
  Insights,
  Schedule,
  People,
  BusinessCenter,
  LocationOn,
} from "@mui/icons-material";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

// Mock data to simulate API responses
const bookings = [
  {
    id: 1,
    date: "2023-08-19",
    time: "10:00 AM",
    customer: "Alice Johnson",
    type: "Banquet Hall",
    status: "confirmed",
    payment_type: "online",
    amount: 5000,
  },
  {
    id: 2,
    date: "2023-08-19",
    time: "02:30 PM",
    customer: "Bob Williams",
    type: "Meeting Room",
    status: "pending",
    payment_type: "upi",
    amount: 800,
  },
  {
    id: 3,
    date: "2023-08-18",
    time: "07:00 PM",
    customer: "Charlie Brown",
    type: "Banquet Hall",
    status: "confirmed",
    payment_type: "cash",
    amount: 6500,
  },
  {
    id: 4,
    date: "2023-08-18",
    time: "09:00 AM",
    customer: "Diana Prince",
    type: "Meeting Room",
    status: "confirmed",
    payment_type: "online",
    amount: 850,
  },
  {
    id: 5,
    date: "2023-08-17",
    time: "04:15 PM",
    customer: "Edward Kenway",
    type: "Conference Room",
    status: "confirmed",
    payment_type: "cash",
    amount: 1200,
  },
  {
    id: 6,
    date: "2023-08-17",
    time: "11:00 AM",
    customer: "Fiona Glenn",
    type: "Meeting Room",
    status: "confirmed",
    payment_type: "online",
    amount: 700,
  },
  {
    id: 7,
    date: "2023-08-16",
    time: "01:00 PM",
    customer: "George Michael",
    type: "Conference Room",
    status: "pending",
    payment_type: "upi",
    amount: 1500,
  },
  {
    id: 8,
    date: "2023-08-16",
    time: "06:00 PM",
    customer: "Hannah Baker",
    type: "Banquet Hall",
    status: "confirmed",
    payment_type: "cash",
    amount: 5500,
  },
];

const analytics = {
  bookings: { online: 60, offline: 40 },
  revenue: { online: 85000, offline: 65000 },
  occupancy: 78,
  paymentModes: { cash: 35, upi: 25, online: 40 },
  topServices: [
    { id: 1, name: "Banquet Hall", bookings: 125, icon: BusinessCenter },
    { id: 2, name: "Conference Room", bookings: 88, icon: LocationOn },
    { id: 3, name: "Meeting Room", bookings: 64, icon: People },
  ],
};

const OwnerDashboard = () => {
  const theme = useTheme();

  // Columns for the table headers
  const bookingHeaders = [
    "Date",
    "Time",
    "Customer",
    "Service Type",
    "Status",
    "Payment",
    "Amount",
  ];

  const totalBookings = analytics.bookings.online + analytics.bookings.offline;
  const totalRevenue = analytics.revenue.online + analytics.revenue.offline;

  const statCards = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: EventAvailable,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
      change: "+12%",
      changeColor: "success.main",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: AttachMoney,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
      change: "+8.5%",
      changeColor: "success.main",
    },
    {
      title: "Occupancy Rate",
      value: `${analytics.occupancy}%`,
      icon: TrendingUp,
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
      change: "-2.1%",
      changeColor: "error.main",
    },
    {
      title: "Today's Bookings",
      value: "12",
      icon: Today,
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1),
      change: "+5",
      changeColor: "success.main",
    },
  ];

  const chartConfigs = [
    {
      title: "Booking Channels",
      subtitle: "Online vs Offline",
      chart: (
        <Pie
          data={{
            labels: ["Online Bookings", "Walk-in Bookings"],
            datasets: [
              {
                data: [analytics.bookings.online, analytics.bookings.offline],
                backgroundColor: [
                  alpha(theme.palette.primary.main, 0.9),
                  alpha(theme.palette.success.main, 0.9),
                ],
                borderWidth: 0,
                hoverOffset: 4,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                position: "bottom",
                labels: { padding: 20, usePointStyle: true },
              },
            },
            maintainAspectRatio: false,
          }}
        />
      ),
      size: 4,
    },
    {
      title: "Revenue Comparison",
      subtitle: "Channel performance",
      chart: (
        <Bar
          data={{
            labels: ["Online", "Offline"],
            datasets: [
              {
                data: [analytics.revenue.online, analytics.revenue.offline],
                backgroundColor: [
                  alpha(theme.palette.primary.main, 0.9),
                  alpha(theme.palette.success.main, 0.9),
                ],
                borderRadius: 8,
                borderSkipped: false,
              },
            ],
          }}
          options={{
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, grid: { display: false } },
              x: { grid: { display: false } },
            },
            maintainAspectRatio: false,
          }}
        />
      ),
      size: 4,
    },
    {
      title: "Payment Methods",
      subtitle: "Distribution breakdown",
      chart: (
        <Doughnut
          data={{
            labels: ["Cash", "UPI", "Online"],
            datasets: [
              {
                data: [
                  analytics.paymentModes.cash,
                  analytics.paymentModes.upi,
                  analytics.paymentModes.online,
                ],
                backgroundColor: [
                  alpha(theme.palette.warning.main, 0.9),
                  alpha(theme.palette.success.main, 0.9),
                  alpha(theme.palette.primary.main, 0.9),
                ],
                borderWidth: 0,
                cutout: "60%",
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                position: "bottom",
                labels: { padding: 20, usePointStyle: true },
              },
            },
            maintainAspectRatio: false,
          }}
        />
      ),
      size: 4,
    },
  ];

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
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor your business performance and key metrics
          </Typography>
        </Box>
      </Fade>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {statCards.map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Grow in timeout={600 + i * 200}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(stat.color, 0.2)}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      sx={{
                        bgcolor: stat.bgColor,
                        color: stat.color,
                        width: 56,
                        height: 56,
                      }}
                    >
                      <stat.icon fontSize="large" />
                    </Avatar>
                    <Box flex={1}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        fontWeight="700"
                        color="text.primary"
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="caption"
                        color={stat.changeColor}
                        fontWeight="600"
                      >
                        {stat.change} from last month
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* Live Status Banner */}
      <Fade in timeout={1000}>
        <Card
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.info.main,
              0.05
            )}, ${alpha(theme.palette.info.main, 0.1)})`,
            border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: theme.shadows[2],
            },
          }}
        >
          <CardContent sx={{ py: 2 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={2}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTime color="info" />
                <Typography variant="h6" fontWeight="600">
                  Live Status
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip
                  icon={<People />}
                  label="3 Active Bookings"
                  color="info"
                  variant="outlined"
                />
                <Chip
                  icon={<Schedule />}
                  label="Peak: 6-9 PM"
                  color="warning"
                  variant="outlined"
                />
                <Chip
                  icon={<Insights />}
                  label="Top: Banquet Hall"
                  color="success"
                  variant="outlined"
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Fade>

      {/* Main Content Grid: Charts and Top Services */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Grow in timeout={800}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  height: 400,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={2}
                >
                  <Box>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Weekly Booking Trend
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last 7 days performance
                    </Typography>
                  </Box>
                  <IconButton size="small" sx={{ color: "text.secondary" }}>
                    <MoreVert />
                  </IconButton>
                </Stack>
                <Box sx={{ flexGrow: 1, position: "relative" }}>
                  <Line
                    data={{
                      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                      datasets: [
                        {
                          label: "Bookings",
                          data: [12, 19, 7, 14, 22, 30, 25],
                          borderColor: theme.palette.primary.main,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                          fill: true,
                          tension: 0.4,
                          pointRadius: 6,
                          pointHoverRadius: 8,
                          pointBackgroundColor: theme.palette.primary.main,
                          pointBorderColor: "#ffffff",
                          pointBorderWidth: 2,
                        },
                      ],
                    }}
                    options={{
                      plugins: { legend: { display: false } },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: { color: alpha(theme.palette.grey[400], 0.3) },
                        },
                        x: { grid: { display: false } },
                      },
                      maintainAspectRatio: false,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grow>
        </Grid>

        {/* New 'Top Services' Card */}
        <Grid item xs={12} md={4}>
          <Grow in timeout={1000}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={2}
                >
                  <Box>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Top Services
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Best-performing bookings
                    </Typography>
                  </Box>
                  <IconButton size="small" sx={{ color: "text.secondary" }}>
                    <MoreVert />
                  </IconButton>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  {analytics.topServices.map((service, i) => (
                    <Stack
                      key={service.id}
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.grey[100], 0.5),
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.grey[200], 0.7),
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        }}
                      >
                        {<service.icon />}
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="subtitle1" fontWeight="600">
                          {service.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {service.bookings} Bookings
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grow>
        </Grid>
      </Grid>

      {/* Secondary Charts Grid */}
      <Grid container spacing={3} mb={4}>
        {chartConfigs.map((config, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Grow in timeout={800 + i * 150}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: 380,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={2}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight="600" gutterBottom>
                        {config.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {config.subtitle}
                      </Typography>
                    </Box>
                    <IconButton size="small" sx={{ color: "text.secondary" }}>
                      <MoreVert />
                    </IconButton>
                  </Stack>
                  <Box sx={{ flexGrow: 1, position: "relative" }}>
                    {config.chart}
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* Recent Bookings Table */}
      <Fade in timeout={1200}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: theme.shadows[8],
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Box>
                <Typography variant="h5" fontWeight="600" gutterBottom>
                  Recent Bookings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Latest customer bookings and their status
                </Typography>
              </Box>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Stack>

            <Box sx={{ height: "auto", width: "100%" }}>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label="recent bookings table"
                >
                  <TableHead
                    sx={{ bgcolor: alpha(theme.palette.grey[100], 0.8) }}
                  >
                    <TableRow>
                      {bookingHeaders.map((header) => (
                        <TableCell
                          key={header}
                          sx={{
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            color: theme.palette.text.primary,
                            borderBottom: "none",
                          }}
                        >
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.slice(0, 7).map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.04),
                          },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ fontSize: "0.875rem" }}
                        >
                          {row.date}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.875rem" }}>
                          {row.time}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.875rem" }}>
                          {row.customer}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.875rem" }}>
                          {row.type}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.875rem" }}>
                          <Chip
                            label={row.status}
                            color={
                              row.status === "confirmed" ? "success" : "warning"
                            }
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.875rem" }}>
                          {row.payment_type}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.875rem" }}>
                          {row.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default OwnerDashboard;
