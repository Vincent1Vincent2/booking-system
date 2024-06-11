const app = require("./app");

async function run() {
  app.listen(3000, () => {
    console.log("Server start at:", "http://localhost:3000");
  });
}
run().catch(console.dir);
