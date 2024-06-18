const { updateHeader } = require("./header/header.ts");
const { updateBookingBadge } = require("./utils/bookingBadge");
const { router } = require("./router/router");

window.router = router;

document.addEventListener("DOMContentLoaded", async () => {
  const errorMessage = document.getElementById("errorMessage");
  const currentPath = window.location.pathname;

  await updateHeader();

  await updateBookingBadge();
  window.router(currentPath);

  document.addEventListener("login", async () => {
    await updateHeader();
    errorMessage?.remove();
    const redirectUrl = localStorage.getItem("redirectAfterLogin");
    if (redirectUrl) {
      localStorage.removeItem("redirectAfterLogin");
      router(redirectUrl);
    } else {
      router("/");
    }
  });

  document.addEventListener("logout", async () => {
    await updateHeader();
    const redirectUrl = localStorage.getItem("redirectAfterLogin");
    if (redirectUrl) {
      localStorage.removeItem("redirectAfterLogin");
      router(redirectUrl);
    } else {
      router("/");
    }
  });

  document.addEventListener("register", async () => {
    errorMessage?.remove();
    router("/login");
  });
});
