// src/components/Reports.jsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Grid,
  Paper,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PeopleIcon from "@mui/icons-material/People";

// Mock data for the reports
const reportsData = [
  {
    title: "Total Revenue",
    value: "₹5,40,000",
    period: "Last 30 days",
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    color: "primary",
  },
  {
    title: "Total Bookings",
    value: "1,240",
    period: "Across all turfs",
    icon: <SportsSoccerIcon sx={{ fontSize: 40 }} />,
    color: "secondary",
  },
  {
    title: "Active Users",
    value: "8,950",
    period: "Currently online",
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    color: "info",
  },
];

const Reports = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header Section */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <BarChartIcon color="primary" sx={{ fontSize: 50 }} />
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Reports & Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Insights and key metrics for your turf business.
          </Typography>
        </Box>
      </Stack>

      {/* Reports Grid */}
      <Grid container spacing={3}>
        {reportsData.map((report) => (
          <Grid item xs={12} sm={6} md={4} key={report.title}>
            <Card
              component={Paper}
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8,
                },
              }}
            >
              <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {report.title}
                  </Typography>
                  <Box sx={{ color: `${report.color}.main`, opacity: 0.7 }}>
                    {report.icon}
                  </Box>
                </Stack>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="text.primary"
                  sx={{ mb: 0.5 }}
                >
                  {report.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.period}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reports;
