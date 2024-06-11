const { router } = require("./router/router");

window.router = router;

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  window.router(currentPath);

  document
    .getElementById("homeButton")
    ?.addEventListener("click", () => window.router("/"));
  document
    .getElementById("loginButton")
    ?.addEventListener("click", () => window.router("/login"));
  document
    .getElementById("registerButton")
    ?.addEventListener("click", () => window.router("/register"));
});
