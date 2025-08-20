import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Avatar,
  Divider,
  Chip,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  LinearProgress,
  useTheme,
  alpha,
  Zoom,
  Container,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  AlertTitle,
  Collapse,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  useMediaQuery,
} from "@mui/material";
import {
  EventAvailable,
  Person,
  Block,
  CalendarToday,
  PeopleAlt,
  TrendingUp,
  Schedule,
  Today,
  Search,
  FilterList,
  MoreVert,
  Add,
  Edit,
  Delete,
  Refresh,
  CheckCircle,
  AccessTime,
  Cancel,
  ExpandMore,
  Close,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

// Mock data (assuming this would come from props or API)
const mockBookings = [
  {
    id: 1,
    date: "2024-01-15",
    time: "09:00 AM",
    customer: "John Smith",
    type: "online",
    service: "Consultation",
    status: "confirmed",
    priority: "high",
    notes: "First time client",
    contact: { phone: "+1234567890", email: "john@example.com" },
    location: "Virtual Meeting",
    duration: 60,
  },
  {
    id: 2,
    date: "2024-01-15",
    time: "02:00 PM",
    customer: "Sarah Johnson",
    type: "offline",
    service: "Follow-up",
    status: "pending",
    priority: "medium",
    notes: "Regular client",
    contact: { phone: "+1234567891", email: "sarah@example.com" },
    location: "Office - Room 101",
    duration: 45,
  },
  {
    id: 3,
    date: "2024-01-16",
    time: "10:00 AM",
    customer: "Blocked Time",
    type: "blocked",
    service: "Maintenance",
    status: "blocked",
    priority: "low",
    notes: "Equipment maintenance",
    location: "Office",
    duration: 120,
  },
];

const getBookingConfig = (theme) => ({
  online: {
    color: "info",
    icon: <EventAvailable />,
    label: "Virtual Meeting",
  },
  offline: {
    color: "success",
    icon: <Person />,
    label: "In-Person",
  },
  blocked: {
    color: "error",
    icon: <Block />,
    label: "Unavailable",
  },
});

const getStatusConfig = (theme) => ({
  confirmed: { color: "success", icon: <CheckCircle /> },
  pending: { color: "warning", icon: <AccessTime /> },
  cancelled: { color: "error", icon: <Cancel /> },
  blocked: { color: "error", icon: <Block /> },
});

const getPriorityConfig = (theme) => ({
  high: { color: "error", label: "High Priority" },
  medium: { color: "warning", label: "Medium Priority" },
  low: { color: "info", label: "Low Priority" },
});

const BookingCalendar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedDate, setSelectedDate] = useState(new Date("2024-01-15"));
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const bookings = mockBookings;

  const bookingConfig = getBookingConfig(theme);
  const statusConfig = getStatusConfig(theme);
  const priorityConfig = getPriorityConfig(theme);

  // Memoized filtered bookings for performance
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesDate =
        new Date(booking.date).toDateString() === selectedDate.toDateString();
      const matchesType = filterType === "all" || booking.type === filterType;
      const matchesSearch =
        booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.notes.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDate && matchesType && matchesSearch;
    });
  }, [bookings, selectedDate, filterType, searchQuery]);

  // Enhanced stats calculation
  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter((b) => b.status === "confirmed").length;
    const cancelled = bookings.filter((b) => b.status === "cancelled").length;
    const blocked = bookings.filter((b) => b.type === "blocked").length;

    return [
      {
        label: "Confirmed",
        value: confirmed,
        icon: <CheckCircle fontSize="large" />,
        color: "success",
      },
      {
        label: "Pending",
        value: total - confirmed - cancelled - blocked,
        icon: <AccessTime fontSize="large" />,
        color: "warning",
      },
      {
        label: "Cancellations",
        value: cancelled,
        icon: <Cancel fontSize="large" />,
        color: "error",
      },
      {
        label: "Blocked Time",
        value: blocked,
        icon: <Block fontSize="large" />,
        color: "secondary",
      },
    ];
  }, [bookings]);

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setDialogOpen(true);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  // Date navigation
  const handleDateChange = (direction) => {
    const newDate = new Date(selectedDate);
    if (direction === "next") {
      newDate.setDate(newDate.getDate() + 1);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setSelectedDate(newDate);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3, minHeight: "100vh" }}>
      {/* Header and Controls */}
      <Box mb={4}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="700"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Booking Calendar
          </Typography>
          <Tooltip title="Refresh Data">
            <IconButton onClick={handleRefresh}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Search and Filter */}
        <Grid container spacing={2} alignItems="center" mb={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl size="small" fullWidth>
              <InputLabel>Filter by Type</InputLabel>
              <Select
                value={filterType}
                label="Filter by Type"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="online">Virtual</MenuItem>
                <MenuItem value="offline">In-Person</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Stats Dashboard */}
      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Zoom in style={{ transitionDelay: `${100 * index}ms` }}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: alpha(theme.palette[stat.color].main, 0.08),
                  border: `1px solid ${alpha(
                    theme.palette[stat.color].main,
                    0.2
                  )}`,
                  borderRadius: 3,
                  p: 2,
                  // height: "100%",
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette[stat.color].main,
                        color: theme.palette.getContrastText(
                          theme.palette[stat.color].main
                        ),
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight="bold">
                        {stat.value}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ my: 3 }} />

      {/* Daily Schedule View */}
      <Box mb={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          flexWrap="wrap"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={() => handleDateChange("prev")}>
              <ChevronLeft />
            </IconButton>
            <Typography variant="h6" fontWeight="bold">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            <IconButton onClick={() => handleDateChange("next")}>
              <ChevronRight />
            </IconButton>
          </Stack>
          <Chip
            label={`${filteredBookings.length} appointments`}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ mt: isMobile ? 1 : 0 }}
          />
        </Stack>

        {loading ? (
          <Stack spacing={2}>
            {[...Array(3)].map((_, index) => (
              <Card key={index} sx={{ borderRadius: 3, p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 48, height: 48 }}>
                    <Today />
                  </Avatar>
                  <Box flexGrow={1}>
                    <LinearProgress sx={{ my: 0.5 }} />
                    <LinearProgress sx={{ width: "60%" }} />
                  </Box>
                  <Chip size="small" label="Loading..." />
                </Stack>
              </Card>
            ))}
          </Stack>
        ) : filteredBookings.length > 0 ? (
          <Grid container spacing={3}>
            {filteredBookings.map((booking, index) => (
              <Grid item xs={12} md={6} lg={4} key={booking.id}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: alpha(
                      theme.palette[bookingConfig[booking.type].color].main,
                      0.05
                    ),
                    border: `1px solid ${alpha(
                      theme.palette[bookingConfig[booking.type].color].main,
                      0.2
                    )}`,
                    borderRadius: 3,
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: `0 8px 25px ${alpha(
                        theme.palette.common.black,
                        0.1
                      )}`,
                    },
                  }}
                  onClick={() => handleBookingClick(booking)}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {booking.customer}
                      </Typography>
                      <Chip
                        label={booking.status}
                        size="small"
                        color={statusConfig[booking.status].color}
                        icon={statusConfig[booking.status].icon}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {booking.service}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Schedule color="action" fontSize="small" />
                        <Typography variant="body2">
                          {booking.time} ({booking.duration} min)
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <EventAvailable color="action" fontSize="small" />
                        <Typography variant="body2">
                          {bookingConfig[booking.type].label}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {/* <LocationOn color="action" fontSize="small" /> */}
                        <Typography variant="body2" noWrap>
                          {booking.location}
                        </Typography>
                      </Stack>
                      <Chip
                        label={priorityConfig[booking.priority].label}
                        color={priorityConfig[booking.priority].color}
                        size="small"
                        sx={{ mt: 1, alignSelf: "flex-start" }}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ mt: 2, borderRadius: 3 }}>
            <AlertTitle>No bookings found for this day.</AlertTitle>
            Try adjusting your search or filter criteria.
          </Alert>
        )}
      </Box>

      {/* Booking Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedBooking && (
          <>
            <DialogTitle>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    bgcolor:
                      theme.palette[bookingConfig[selectedBooking.type].color]
                        .main,
                  }}
                >
                  {bookingConfig[selectedBooking.type].icon}
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  {selectedBooking.customer}
                </Typography>
                <Chip
                  label={selectedBooking.status}
                  size="small"
                  color={statusConfig[selectedBooking.status].color}
                  sx={{ ml: "auto" }}
                />
              </Stack>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Service
                  </Typography>
                  <Typography variant="body1">
                    {selectedBooking.service}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Time & Duration
                  </Typography>
                  <Typography variant="body1">
                    {selectedBooking.time} ({selectedBooking.duration} min)
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1">
                    {selectedBooking.location}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Priority
                  </Typography>
                  <Typography variant="body1">
                    {priorityConfig[selectedBooking.priority].label}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Notes
                  </Typography>
                  <Typography variant="body1">
                    {selectedBooking.notes}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default BookingCalendar;
