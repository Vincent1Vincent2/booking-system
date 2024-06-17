import { PrismaClient } from "@prisma/client";
import { defineConfig } from "cypress";
const prisma = new PrismaClient();

export default defineConfig({
  e2e: {
    baseUrl: "https://booking-system-lovat.vercel.app",
    setupNodeEvents(on, config) {
      /*      on("task", { clear }); */
    },
    env: {
      BASE_URL: "https://booking-system-lovat.vercel.app",
      API_URL: "https://booking-system-52fbcxat6q-lz.a.run.app/api",
    },
  },
});

async function clear() {
  await prisma.booking.deleteMany({});
}
