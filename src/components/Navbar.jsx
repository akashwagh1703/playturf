import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Badge,
  Tooltip,
  useTheme,
  alpha,
  Fade,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications,
  Settings,
  Logout,
  Person,
  Dashboard,
  SportsSoccer,
  ChevronLeft,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleOpenMenu = (event, type) => {
    if (type === "profile") {
      setAnchorEl(event.currentTarget);
    } else if (type === "notifications") {
      setNotificationAnchor(event.currentTarget);
    }
  };

  const handleCloseMenu = (type) => {
    if (type === "profile") {
      setAnchorEl(null);
    } else if (type === "notifications") {
      setNotificationAnchor(null);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // This is where you would clear any local storage or session-related data
    // For example, if you store a JWT token:
    localStorage.removeItem("auth");

    // Close the menu
    handleCloseMenu("profile");

    // Redirect the user to the login page or home page
    // Note: In a real app, you would use a router (e.g., react-router-dom) for navigation.
    // window.location.href = "/login";
    console.log("Logged out. Local storage cleared.");
    navigate(`/login`);
  };

  // Function to handle logout
  const handleRedirect = (url) => {

    navigate(`/${url}`);

    // Close the menu
    handleCloseMenu("profile");
  };

  const isProfileMenuOpen = Boolean(anchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchor);

  const menuId = "profile-menu";
  const notificationMenuId = "notifications-menu";

  // Pre-defined menu items to reduce redundancy
  const profileMenuItems = [
    {
      text: "My Profile",
      icon: <Person fontSize="small" />,
      action: () => handleRedirect("profile"),
    },
    {
      text: "Settings",
      icon: <Settings fontSize="small" />,
      action: () => handleRedirect("settings"),
    },
    { text: "Logout", icon: <Logout fontSize="small" />, action: handleLogout },
  ];

  const notifications = [
    {
      title: "New booking confirmed",
      subtitle: "Court A - Today at 3:00 PM",
    },
    {
      title: "Payment received",
      subtitle: "₹500 for Court B booking",
    },
    {
      title: "Booking cancelled",
      subtitle: "Court C - Tomorrow at 6:00 PM",
    },
  ];

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isProfileMenuOpen}
      onClose={() => handleCloseMenu("profile")}
      PaperProps={{
        elevation: 8,
        sx: {
          mt: 1.5,
          minWidth: 220,
          borderRadius: "12px",
          boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.1)}`,
          backdropFilter: "blur(4px)",
          border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            mr: 1.5,
          },
        },
      }}
      TransitionComponent={Fade}
    >
      <MenuItem onClick={() => handleCloseMenu("profile")}>
        <Avatar
          sx={{
            bgcolor: theme.palette.secondary.main,
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          JD
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            John Doe
          </Typography>
          <Typography variant="caption" color="text.secondary">
            john.doe@example.com
          </Typography>
        </Box>
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      {profileMenuItems.map((item, index) => (
        <MenuItem
          key={index}
          onClick={item.action}
          sx={{
            py: 1,
            px: 2,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          {item.text}
        </MenuItem>
      ))}
    </Menu>
  );

  const renderNotificationsMenu = (
    <Menu
      anchorEl={notificationAnchor}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={notificationMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isNotificationMenuOpen}
      onClose={() => handleCloseMenu("notifications")}
      PaperProps={{
        elevation: 8,
        sx: {
          mt: 1.5,
          minWidth: 320,
          maxHeight: 400,
          borderRadius: "12px",
          boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.1)}`,
          backdropFilter: "blur(4px)",
          border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
        },
      }}
      TransitionComponent={Fade}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600}>
          Notifications
        </Typography>
      </Box>
      {notifications.map((notification, index) => (
        <MenuItem
          key={index}
          onClick={() => handleCloseMenu("notifications")}
          sx={{
            py: 1.5,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {notification.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {notification.subtitle}
            </Typography>
          </Box>
        </MenuItem>
      ))}
      <Divider sx={{ my: 0.5 }} />
      <MenuItem
        onClick={() => handleCloseMenu("notifications")}
        sx={{
          justifyContent: "center",
          color: "primary.main",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        }}
      >
        View All Notifications
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: alpha(theme.palette.background.default, 0.7),
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: "100%",
        transition: theme.transitions.create(["width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar
        sx={{
          minHeight: "64px !important",
          px: { xs: 2, sm: 3 },
          justifyContent: "space-between",
        }}
      >
        {/* Left Side: Toggle and Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title={open ? "Close menu" : "Open menu"}>
            <IconButton
              color="default"
              edge="start"
              onClick={() => setOpen(!open)}
              sx={{
                mr: 2,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: open ? "rotate(0deg)" : "rotate(90deg)",
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                },
              }}
            >
              {open ? <ChevronLeft /> : <MenuIcon />}
            </IconButton>
          </Tooltip>

          {/* Logo / Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SportsSoccer
              sx={{ fontSize: 28, color: theme.palette.primary.dark }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: theme.palette.text.primary,
                display: { xs: "none", sm: "block" },
              }}
            >
              TurfLink
            </Typography>
          </Box>
        </Box>

        {/* Right Side: Actions */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}
        >
          {/* Dashboard Button */}
          <Button
            color="primary"
            startIcon={<Dashboard />}
            variant="contained"
            sx={{
              display: { xs: "none", md: "flex" },
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",
            }}
          >
            Dashboard
          </Button>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              color="primary"
              onClick={(e) => handleOpenMenu(e, "notifications")}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile Menu */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={(e) => handleOpenMenu(e, "profile")}
              sx={{
                p: 0,
                ml: 1,
                borderRadius: "50%",
                border: `2px solid ${theme.palette.primary.main}`,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <Avatar
                alt="John Doe"
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                JD
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      {renderProfileMenu}
      {renderNotificationsMenu}
    </AppBar>
  );
};

export default Navbar;
