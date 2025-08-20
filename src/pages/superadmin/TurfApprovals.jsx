// src/pages/owner/TurfApprovals.jsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const pendingTurfs = [
  { id: 101, name: "Greenfield Arena", owner: "Rohit Sharma" },
  { id: 102, name: "Victory Turf", owner: "Virat Kohli" },
  { id: 103, name: "The Champions' Pitch", owner: "Sachin Tendulkar" },
];

const TurfApprovals = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <PendingActionsIcon color="warning" sx={{ fontSize: 50 }} />
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Turf Approval Requests
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review and approve new turf listings.
          </Typography>
        </Box>
      </Stack>

      {/* Turf Requests List */}
      <Stack spacing={3}>
        {pendingTurfs.length > 0 ? (
          pendingTurfs.map((turf) => (
            <Card
              key={turf.id}
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "box-shadow 0.3s, transform 0.3s",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  spacing={2}
                >
                  {/* Turf Info */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        bgcolor: "primary.light",
                        color: "primary.main",
                        p: 1.5,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <SportsSoccerIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {turf.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Requested by:{" "}
                        <Typography component="span" fontWeight="medium">
                          {turf.owner}
                        </Typography>
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Actions */}
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: { xs: 2, sm: 0 } }}
                  >
                    <Tooltip title="Approve Turf">
                      <IconButton
                        color="success"
                        sx={{
                          border: "1px solid",
                          borderColor: "success.main",
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Reject Turf">
                      <IconButton
                        color="error"
                        sx={{ border: "1px solid", borderColor: "error.main" }}
                      >
                        <CancelOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Button variant="contained" color="info" size="small">
                      View Details
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6">
              No pending turf requests at this time.
            </Typography>
            <Typography variant="body2">
              You will be notified when a new request is submitted.
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default TurfApprovals;
