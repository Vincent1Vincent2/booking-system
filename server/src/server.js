const app = require("./app");
const archivePastBookings = require("./utils/achieveBookings");

async function run() {
  await archivePastBookings();
  app.listen(3000, () => {
    console.log("Server start at:", "http://localhost:3000");
  });
}
run().catch(console.dir);
