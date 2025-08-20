import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Dashboard,
  Event,
  AddBox,
  Payment,
  People,
  BarChart,
  Menu as MenuIcon,
  ChevronLeft,
  AccountCircle,
  Logout,
  Settings,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { getAuth } from "../utils/auth";

const drawerWidth = 250;
const collapsedWidth = 72;

const Sidebar = ({ open, setOpen }) => {
  const auth = getAuth();
  const location = useLocation();

  const menuItems =
    auth?.role === "owner"
      ? [
          { text: "Dashboard", path: "/", icon: <Dashboard />, badge: null },
          {
            text: "Booking Calendar",
            path: "/calendar",
            icon: <Event />,
            badge: "3",
          },
          {
            text: "Add Turf",
            path: "/add-turf",
            icon: <AddBox />,
            badge: null,
          },
          {
            text: "Add Booking",
            path: "/add-booking",
            icon: <AddBox />,
            badge: null,
          },
          {
            text: "Subscription",
            path: "/subscription",
            icon: <Payment />,
            badge: "Pro",
          },
        ]
      : [
          { text: "Overview", path: "/", icon: <Dashboard />, badge: null },
          { text: "Owners", path: "/owners", icon: <People />, badge: "24" },
          {
            text: "Turf Approvals",
            path: "/turf-approvals",
            icon: <AddBox />,
            badge: "5",
          },
          {
            text: "Reports",
            path: "/reports",
            icon: <BarChart />,
            badge: null,
          },
        ];

  const bottomMenuItems = [
    { text: "Settings", path: "/settings", icon: <Settings /> },
    { text: "Logout", path: "/logout", icon: <Logout /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: "border-box",
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowX: "hidden",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRight: "none",
          marginTop: "64px",
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.1)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: "3px",
          },
        },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          padding: "16px 12px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {open ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
              }}
            >
              <AccountCircle />
            </Avatar>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ color: "white", fontWeight: 600, fontSize: "0.875rem" }}
              >
                {auth?.name || "Admin User"}
              </Typography>
              <Chip
                label={auth?.role || "Admin"}
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.75rem",
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            </Box>
          </Box>
        ) : (
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
          >
            <AccountCircle />
          </Avatar>
        )}
        {/* <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            color: "white",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          {open ? <ChevronLeft /> : <MenuIcon />}
        </IconButton> */}
      </Box>

      {/* Main Navigation */}
      <List sx={{ px: 1, py: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Tooltip
              title={!open ? item.text : ""}
              placement="right"
              key={item.text}
            >
              <ListItem
                button
                component={Link}
                to={item.path}
                sx={{
                  mb: 0.5,
                  borderRadius: 2,
                  mx: 0.5,
                  px: 2,
                  py: 1.5,
                  position: "relative",
                  overflow: "hidden",
                  background: active
                    ? "rgba(255, 255, 255, 0.15)"
                    : "transparent",
                  "&:hover": {
                    background: active
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(255, 255, 255, 0.08)",
                    transform: "translateX(4px)",
                  },
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: active ? 4 : 0,
                    background: "white",
                    borderRadius: "0 4px 4px 0",
                    transition: "width 0.3s ease",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: active ? "white" : "rgba(255, 255, 255, 0.8)",
                    minWidth: 40,
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: active
                              ? "white"
                              : "rgba(255, 255, 255, 0.9)",
                            fontWeight: active ? 600 : 500,
                            fontSize: "0.875rem",
                          }}
                        >
                          {item.text}
                        </Typography>
                        {item.badge && (
                          <Chip
                            label={item.badge}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.75rem",
                              background: active
                                ? "rgba(255, 255, 255, 0.2)"
                                : "rgba(255, 255, 255, 0.15)",
                              color: "white",
                              "& .MuiChip-label": { px: 1 },
                            }}
                          />
                        )}
                      </Box>
                    }
                  />
                )}
              </ListItem>
            </Tooltip>
          );
        })}
      </List>

      {/* Bottom Section */}
      <Box sx={{ mt: "auto" }}>
        <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", mx: 2 }} />
        <List sx={{ px: 1, py: 1 }}>
          {bottomMenuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Tooltip
                title={!open ? item.text : ""}
                placement="right"
                key={item.text}
              >
                <ListItem
                  button
                  component={Link}
                  to={item.path}
                  sx={{
                    mb: 0.5,
                    borderRadius: 2,
                    mx: 0.5,
                    px: 2,
                    py: 1,
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.08)",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      minWidth: 40,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.8)",
                            fontSize: "0.875rem",
                          }}
                        >
                          {item.text}
                        </Typography>
                      }
                    />
                  )}
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
