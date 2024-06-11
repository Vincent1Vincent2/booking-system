const prisma = require("../../prisma/db");

exports.createBooking = async (req, res) => {
  const { roomId, date } = req.body;

  if (!roomId) {
    return res
      .status(404)
      .json({ message: "Room not found or id not provided" });
  }

  const room = await prisma.room.findUnique({ where: { id: roomId } });

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  if (!date) {
    return res.status(404).json({ message: "Date not found or provided" });
  }

  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const booking = await prisma.booking.create({
      data: { date: date, roomId: roomId, room: room },
    });

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
  }
};

exports.getBookings = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const bookings = await prisma.booking.findUnique({
    where: { userId: user.id },
  });

  if (!bookings) {
    res.status(404).json({ message: "No bookings found" });
  }

  res.status(200).json(bookings);
};
