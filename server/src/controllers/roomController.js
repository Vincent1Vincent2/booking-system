const prisma = require("../../prisma/db");

exports.getRooms = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const rooms = await prisma.room.findMany({});

  if (!rooms) {
    return res.status(404).json({ message: "No rooms found" });
  } else {
    return res.status(200).json(rooms);
  }
};
