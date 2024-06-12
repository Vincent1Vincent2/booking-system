const { updateHeader } = require("./header/header.ts");
const { router } = require("./router/router");

window.router = router;

document.addEventListener("DOMContentLoaded", async () => {
  const currentPath = window.location.pathname;

  await updateHeader();
  window.router(currentPath);

  document.addEventListener("login", async () => {
    await updateHeader(); // Ensure header updates upon login
    window.router("/"); // Redirect to home or another route after login if needed
  });
  document.addEventListener("logout", async () => {
    await updateHeader();
  });
});
