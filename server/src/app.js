require("dotenv").config();

const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const roomRoutes = require("./routes/roomRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:9000",
  "https://booking-system-lovat.vercel.app",
];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  cookieSession({
    name: "token",
    secret: process.env.SECRET || "401be75bbb0faf350d3d91a1d5e542a1",
    sameSite: "none",
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
