const { setupLoginForm, closeLoginForm } = require("../user/login.ts");
const { closeRegisterForm, setupRegisterForm } = require("../user/register");
const {
  closeBookingForm,
  setupBookingForm,
} = require("../booking/createBooking");
import { Route } from "./interface";

const appRoutes: Route[] = [
  {
    path: "/",
    element: () => `<span>Yo home</span>`,
    init: () => {
      closeLoginForm();
      closeRegisterForm();
      closeBookingForm();
    },
  },
  {
    path: "/login",
    element: () => `<span>Yo this login</span>`,
    init: () => {
      closeRegisterForm();
      closeBookingForm();
      setupLoginForm();
    },
  },
  {
    path: "/register",
    element: () => `<span>Yo this register</span>`,
    init: () => {
      closeLoginForm();
      closeBookingForm();
      setupRegisterForm();
    },
  },
  {
    path: "/book-room",
    element: () => `<span>Yo this booking rooms</span>`,
    init: () => {
      closeLoginForm();
      closeRegisterForm();
      setupBookingForm();
    },
  },
];

module.exports = appRoutes;
