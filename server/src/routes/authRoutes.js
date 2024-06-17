const express = require("express");
const {
  register,
  login,
  getUser,
  logout,
} = require("../controllers/authController");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authenticateToken, getUser);
router.post("/logout", logout);
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is protected data" });
});

module.exports = router;
