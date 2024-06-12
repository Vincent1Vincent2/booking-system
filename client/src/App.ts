const { updateHeader } = require("./header/header.ts");
const { router } = require("./router/router");

window.router = router;

document.addEventListener("DOMContentLoaded", async () => {
  const currentPath = window.location.pathname;

  await updateHeader();
  window.router(currentPath);

  document.addEventListener("login", async () => {
    await updateHeader();
    window.router("/");
  });
  document.addEventListener("logout", async () => {
    await updateHeader();
  });
});
