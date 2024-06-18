const {
  renderLoggedInHeader,
  renderLoggedOutHeader,
} = require("../components/header/header.ts");
const { logout } = require("../utils/api/user");

import { isAuthenticated } from "../utils/api/user";
let header: HTMLHeadingElement | null;

export async function updateHeader() {
  header = document.getElementById("header") as HTMLHeadingElement;

  header.innerHTML = "";

  const isLoggedIn = await isAuthenticated();

  const nav = isLoggedIn ? renderLoggedInHeader() : renderLoggedOutHeader();
  header.appendChild(nav);

  document
    .getElementById("homeButton")
    ?.addEventListener("click", () => window.router("/"));
  document
    .getElementById("loginButton")
    ?.addEventListener("click", () => window.router("/login"));

  document
    .getElementById("registerButton")
    ?.addEventListener("click", () => window.router("/register"));

  document
    .getElementById("bookButton")
    ?.addEventListener("click", () => window.router("/book-room"));

  document
    .getElementById("bookingsButton")
    ?.addEventListener("click", () => window.router("/my-bookings"));

  document
    .getElementById("logoutButton")
    ?.addEventListener("click", async () => await logout());
}
