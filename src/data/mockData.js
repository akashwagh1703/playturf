// src/data/mockData.js

export const users = [
  { id: 1, email: "owner@turf.com", password: "pass123", role: "owner" },
  { id: 2, email: "admin@turf.com", password: "admin123", role: "super-admin" },
]

export const turfs = [
  {
    id: 1,
    name: "GreenField Turf",
    location: "Mumbai",
    pitches: 2,
    pricing: 1000,
    images: ["/placeholder.png", "/placeholder.png"],
  },
]

export const bookings = [
  {
    id: 1,
    date: "2025-08-21",
    time: "18:00",
    customer: "John Doe",
    type: "online",
    status: "confirmed",
    payment_type: "online",
    amount: 1000,
  },
  {
    id: 2,
    date: "2025-08-21",
    time: "19:00",
    customer: "Jane Smith",
    type: "offline",
    status: "confirmed",
    payment_type: "cash",
    amount: 900,
  },
]

export const analytics = {
  bookings: { online: 70, offline: 50 },
  revenue: { online: 75000, offline: 45000 },
  occupancy: 80,
  topHours: { "18:00": 20, "19:00": 15 },
  customers: { new: 40, repeat: 80 },
  paymentModes: { cash: 40, upi: 40, online: 20 },
}

export const superAdminAnalytics = {
  gmv: 500000,
  mau: 1000,
  activeTurfs: 75,
  conversion: 0.05,
}

export const owners = [
  { id: 1, name: "John", email: "owner@turf.com", turfs: 2, kyc_status: "verified" },
  { id: 2, name: "Aditi", email: "aditi@turf.com", turfs: 1, kyc_status: "pending" },
]
