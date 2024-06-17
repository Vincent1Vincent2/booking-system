const prisma = require("../../prisma/db");
const cron = require("node-cron");

const archivePastBookings = async () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  console.log(`Current date and time (start of day): ${now}`);

  try {
    const pastBookings = await prisma.booking.findMany({
      where: {
        date: {
          lt: now,
        },
        archived: false,
      },
    });

    console.log("Bookings to be archived:", pastBookings);

    if (pastBookings.length > 0) {
      await prisma.booking.updateMany({
        where: {
          date: {
            lt: now,
          },
          archived: false,
        },
        data: {
          archived: true,
        },
      });

      console.log("Past bookings archived successfully");
    } else {
      console.log("No past bookings to archive");
    }
  } catch (error) {
    console.error("Error archiving past bookings:", error);
  }
};

cron.schedule("0 0 * * *", () => {
  console.log("Running archive task...");
  archivePastBookings()
    .then(() => {
      console.log("Archive task completed");
    })
    .catch((error) => {
      console.error("Error archiving past bookings:", error);
    });
});

module.exports = archivePastBookings;
