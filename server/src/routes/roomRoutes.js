const express = require("express");
const { getRooms } = require("../controllers/roomController");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.get("/room", authenticateToken, getRooms);
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is protected data" });
});

module.exports = router;
