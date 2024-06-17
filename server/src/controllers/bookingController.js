const prisma = require("../../prisma/db");

exports.createBooking = async (req, res) => {
  const { roomId, date } = req.body;

  if (!roomId) {
    return res
      .status(400)
      .json({ message: "Room not found or id not provided" });
  }

  const room = await prisma.room.findUnique({ where: { id: roomId } });

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  if (!date) {
    return res.status(400).json({ message: "Date not found or provided" });
  }

  const bookingDate = new Date(date);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (bookingDate < now) {
    return res.status(400).json({ message: "Cannot book a date in the past" });
  }

  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const existingBooking = await prisma.booking.findFirst({
    where: {
      roomId: room.id,
      date: bookingDate,
      archived: false,
    },
  });

  if (existingBooking) {
    return res
      .status(400)
      .json({ message: "Booking already exists for this date" });
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        date: bookingDate,
        room: {
          connect: { id: room.id },
        },
        user: {
          connect: { id: user.id },
        },
      },
    });

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking" });
  }
};

exports.getBookings = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
      archived: false,
    },
  });

  if (bookings.length === 0) {
    return res.status(404).json({ message: "No bookings found" });
  }

  res.status(200).json(bookings);
};

exports.getPastBookings = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
      archived: true,
    },
  });

  if (bookings.length === 0) {
    return res.status(404).json({ message: "No bookings found" });
  }

  res.status(200).json(bookings);
};

exports.removeBooking = async (req, res) => {
  const { bookingId } = req.params;

  if (!bookingId) {
    return res.status(400).json({ message: "Booking ID not provided" });
  }

  try {
    const booking = await prisma.booking.update({
      where: { id: parseInt(bookingId) },
      data: { archived: true },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking archived successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error archiving booking" });
  }
};
