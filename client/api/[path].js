const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
  const filePath = path.join(__dirname, "../dist/index.html");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading index.html");
      return;
    }
    res.setHeader("Content-Type", "text/html");
    res.send(data);
  });
};
