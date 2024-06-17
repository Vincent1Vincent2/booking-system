import { defineConfig } from "cypress";

async function clearBookings() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

  try {
    await prisma.booking.deleteMany({});
    return null;
  } catch (error) {
    console.error("Error clearing bookings:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default defineConfig({
  e2e: {
    baseUrl: "https://booking-system-lovat.vercel.app",
    setupNodeEvents(on, config) {
      on("task", { clearBookings });
    },
    env: {
      BASE_URL: "https://booking-system-lovat.vercel.app",
      API_URL: "https://booking-system-52fbcxat6q-lz.a.run.app/api",
    },
  },
});
