// src/pages/owner/Subscription.jsx

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  Stack,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PaymentIcon from "@mui/icons-material/Payment";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const invoices = [
  { id: 1, date: "2025-07-01", amount: "₹2000", status: "Paid" },
  { id: 2, date: "2025-08-01", amount: "₹2000", status: "Pending" },
  { id: 3, date: "2025-06-01", amount: "₹2000", status: "Paid" },
];

const Subscription = () => {
  const currentPlan = {
    name: "Pro",
    price: "₹1999/month",
    validUntil: "2025-08-30",
    features: ["Unlimited Bookings", "Analytics Dashboard", "24/7 Support"],
  };

  const nextInvoice = invoices.find((inv) => inv.status === "Pending");

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        color="primary.main"
      >
        Subscription Dashboard 🚀
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Current Plan Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              background: "linear-gradient(135deg, #1d2b64 0%, #3f51b5 100%)",
              color: "white",
              boxShadow: 6,
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <UpgradeIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" fontWeight="bold">
                  Current Plan
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                {currentPlan.name}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.8 }}>
                {currentPlan.price}
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  borderLeft: "3px solid",
                  borderColor: "rgba(255,255,255,0.5)",
                  pl: 2,
                }}
              >
                <Typography variant="body1">
                  Valid until: **{currentPlan.validUntil}**
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Your plan includes: {currentPlan.features.join(", ")}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end", pr: 2 }}>
              <Button
                variant="contained"
                endIcon={<ChevronRightIcon />}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  "&:hover": { bgcolor: "grey.200" },
                }}
              >
                Manage Plan
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Next Invoice Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              border: "1px solid #e0e0e0",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PaymentIcon
                  sx={{ fontSize: 40, mr: 2, color: "primary.main" }}
                />
                <Typography variant="h5" fontWeight="bold">
                  Next Payment
                </Typography>
              </Box>
              {nextInvoice ? (
                <Stack spacing={1}>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="warning.main"
                  >
                    {nextInvoice.amount}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Due on: **{nextInvoice.date}**
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Chip
                      icon={<AccessTimeIcon />}
                      label="Pending"
                      color="warning"
                      variant="outlined"
                      sx={{ mr: 1, fontWeight: "bold" }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ ml: 2, borderRadius: 2 }}
                    >
                      Pay Now
                    </Button>
                  </Box>
                </Stack>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No upcoming payments. You're all set! 🎉
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* --- */}

      {/* Invoice History Section */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Invoice History
      </Typography>
      <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Grid container rowSpacing={1} p={2}>
          {invoices.length > 0 ? (
            invoices.map((inv, index) => (
              <React.Fragment key={inv.id}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    p: 2,
                    bgcolor: index % 2 === 0 ? "action.hover" : "white",
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" fontWeight="medium">
                        Invoice **#{inv.id}** ({inv.date})
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        Amount: **{inv.amount}**
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "flex-start", sm: "flex-end" },
                        mt: { xs: 1, sm: 0 },
                      }}
                    >
                      <Chip
                        icon={
                          inv.status === "Paid" ? (
                            <CheckCircleIcon />
                          ) : (
                            <AccessTimeIcon />
                          )
                        }
                        label={inv.status}
                        color={inv.status === "Paid" ? "success" : "warning"}
                        variant="outlined"
                        sx={{ fontWeight: "bold", mr: 1 }}
                      />
                      <Tooltip title="Download Invoice">
                        <IconButton size="small">
                          <FileDownloadIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ py: 4, textAlign: "center", color: "text.secondary" }}>
                <Typography>No invoice history found.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Subscription;
