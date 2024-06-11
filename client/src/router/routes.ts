const { setupLoginForm, closeLoginForm } = require("../user/login.ts");
const { closeRegisterForm, setupRegisterForm } = require("../user/register");
import { Route } from "./interface";

const appRoutes: Route[] = [
  {
    path: "/",
    element: () => `
      <span>Yo home</span>
    
    `,
    init: () => {
      closeLoginForm();
      closeRegisterForm();
    },
  },
  {
    path: "/login",
    element: () => `
      <span>Yo this login</span>
    
    `,
    init: () => {
      setupLoginForm();
    },
  },
  {
    path: "/register",
    element: () => `
      <span>Yo this register</span>
    
    `,

    init: () => {
      setupRegisterForm();
    },
  },
];

module.exports = appRoutes;
