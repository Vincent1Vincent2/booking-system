require("dotenv").config();

const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const roomRoutes = require("./routes/roomRoutes");
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(express.json());
app.use(
  cookieSession({
    name: "token",
    secret: process.env.SECRET || "401be75bbb0faf350d3d91a1d5e542a1",
    maxAge: 24 * 60 * 60 * 10000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  })
);
app.use(cors());

app.use(limiter);
app.use("/api/auth", authRoutes);
app.use("/api/auth", bookingRoutes);
app.use("/api/auth", roomRoutes);

module.exports = app;
