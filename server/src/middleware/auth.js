const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.session.token;

  console.log(token);

  if (!token && !backup) return res.sendStatus(401);

  jwt.verify(token || backup, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
