const express = require("express");
const {
  createBooking,
  getBookings,
} = require("../controllers/bookingController");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.post("/book", authenticateToken, createBooking);
router.get("/bookings", authenticateToken, getBookings);
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is protected data" });
});

module.exports = router;
