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
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(bookingId) },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to remove this booking" });
    }

    const deletedBooking = await prisma.booking.delete({
      where: { id: parseInt(bookingId) },
    });

    res
      .status(200)
      .json({ message: "Booking removed successfully", deletedBooking });
  } catch (error) {
    console.error("Error removing booking:", error);
    res.status(500).json({ message: "Error removing booking" });
  }
};

exports.editBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { date, roomId } = req.body;

  if (!bookingId) {
    return res.status(400).json({ message: "Booking ID not provided" });
  }

  if (!date && !roomId) {
    return res.status(400).json({ message: "No fields to update provided" });
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(bookingId) },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this booking" });
    }

    if (date && roomId) {
      const existingBooking = await prisma.booking.findFirst({
        where: {
          date: new Date(date),
          roomId: parseInt(roomId),
          archived: false,
          id: { not: parseInt(bookingId) },
        },
      });

      if (existingBooking) {
        return res.status(400).json({
          message: "There is already a booking for this date and room",
        });
      }
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(bookingId) },
      data: {
        ...(date && { date: new Date(date) }),
        ...(roomId && { roomId: parseInt(roomId) }),
      },
    });

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating booking" });
  }
};
