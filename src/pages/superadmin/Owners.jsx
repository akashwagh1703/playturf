import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Typography,
  Button,
  Box,
  Stack,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

// Mock data for the component
const owners = [
  { id: 1, name: "Rohit Sharma", email: "rohit@example.com", turfs: 3 },
  { id: 2, name: "Virat Kohli", email: "virat@example.com", turfs: 5 },
  { id: 3, name: "Jasprit Bumrah", email: "jasprit@example.com", turfs: 1 },
  { id: 4, name: "Hardik Pandya", email: "hardik@example.com", turfs: 2 },
  { id: 5, name: "Shikhar Dhawan", email: "shikhar@example.com", turfs: 4 },
];

const Owners = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header with Title and Icon */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <PersonIcon color="primary" sx={{ fontSize: 50 }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Turf Owners
        </Typography>
      </Stack>

      {/* Table Container with enhanced styling */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="owners table">
          {/* Table Header */}
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Owner
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="center"
              >
                <FormatListBulletedIcon
                  fontSize="small"
                  sx={{ mr: 1, verticalAlign: "bottom" }}
                />
                Turfs
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="right"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {owners.map((owner) => (
              <TableRow
                key={owner.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    bgcolor: "action.hover",
                    transition: "background-color 0.3s",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: "primary.light" }}>
                      {owner.name.charAt(0)}
                    </Avatar>
                    <Typography variant="body1" fontWeight="medium">
                      {owner.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {owner.email}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={owner.turfs}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details">
                    <IconButton color="primary">
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove Owner">
                    <IconButton color="error">
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Owners;
