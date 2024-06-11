const appRoutes = require("./routes");

export const router = (path: string) => {
  window.history.pushState({}, "", path);

  const route = appRoutes.find((route: any) => route.path === path);

  if (route) {
    const app = document.getElementById("app");
    if (app) {
      const content =
        typeof route.element === "function" ? route.element() : route.element;
      app.innerHTML = content;

      if (route.init) {
        route.init();
      }
    }
  }
};

module.exports = { router };
