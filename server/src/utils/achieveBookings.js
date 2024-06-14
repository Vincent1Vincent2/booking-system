const prisma = require("../../prisma/db");
const cron = require("node-cron");

const archivePastBookings = async () => {
  const now = new Date();

  try {
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

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
