const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/db");
const { verifyRecaptcha } = require("../utils/recaptcha");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.register = async (req, res) => {
  const { email, password, recaptchaToken } = req.body;
  const isHuman = await verifyRecaptcha(recaptchaToken);

  if (!isHuman) {
    return res.status(400).json({ message: "reCAPTCHA failed" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const { password: _, ...userWithoutPassword } = newUser;

  const noPassword = [userWithoutPassword];

  const token = generateToken(newUser);
  res.status(200).json({ token, user: noPassword });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const { password: _, ...userWithoutPassword } = user;

  const noPassword = [userWithoutPassword];

  const token = generateToken(user);

  req.session.token = token;
  console.log("Token set in session:", req.session.token);

  return res.status(200).json({ user: noPassword });
};

exports.getUser = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { password: _, ...userWithoutPassword } = user;

  res.status(200).json(userWithoutPassword);
};