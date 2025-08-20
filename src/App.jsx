import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Owner Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import BookingCalendar from "./pages/owner/BookingCalendar";
import AddTurf from "./pages/owner/AddTurf";
import AddBooking from "./pages/owner/AddBooking";
import Subscription from "./pages/owner/Subscription";

// Super Admin Pages
import Overview from "./pages/superadmin/Overview";
import Owners from "./pages/superadmin/Owners";
import TurfApprovals from "./pages/superadmin/TurfApprovals";
import Reports from "./pages/superadmin/Reports";
import OwnerSettings from "./pages/owner/OwnerSettings";
import AdminSettings from "./pages/superadmin/AdminSettings";
import { getAuth } from "./utils/auth";
import OwnerProfile from "./pages/owner/OwnerProfile";
import SuperAdminProfile from "./pages/superadmin/SuperAdminProfile";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";

function App() {
  const auth = getAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Owner Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute roles={["owner", "superadmin"]}>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Owner only */}
        {/* <Route index element={<OwnerDashboard />} /> */}
        <Route
          index
          element={
            <ProtectedRoute roles={["owner", "superadmin"]}>
              {auth?.role === "owner" ? (
                <OwnerDashboard />
              ) : (
                <SuperAdminDashboard />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="calendar"
          element={
            <ProtectedRoute roles={["owner"]}>
              <BookingCalendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="add-turf"
          element={
            <ProtectedRoute roles={["owner"]}>
              <AddTurf />
            </ProtectedRoute>
          }
        />
        <Route
          path="add-booking"
          element={
            <ProtectedRoute roles={["owner"]}>
              <AddBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="subscription"
          element={
            <ProtectedRoute roles={["owner"]}>
              <Subscription />
            </ProtectedRoute>
          }
        />
        {/* Super Admin only */}
        <Route index element={<Overview />} />
        <Route
          path="owners"
          element={
            <ProtectedRoute roles={["superadmin"]}>
              <Owners />
            </ProtectedRoute>
          }
        />
        <Route
          path="turf-approvals"
          element={
            <ProtectedRoute roles={["superadmin"]}>
              <TurfApprovals />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports"
          element={
            <ProtectedRoute roles={["superadmin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute roles={["owner", "superadmin"]}>
              {auth?.role === "owner" ? <OwnerSettings /> : <AdminSettings />}
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute roles={["owner", "superadmin"]}>
              {auth?.role === "owner" ? (
                <OwnerProfile />
              ) : (
                <SuperAdminProfile />
              )}
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
