const {
  renderLoggedInHeader,
  renderLoggedOutHeader,
} = require("../components/header/header.ts");
import { isAuthenticated } from "../user/auth";
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
}
