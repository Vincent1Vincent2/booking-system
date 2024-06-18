const { setupLoginForm, closeLoginForm } = require("../user/login.ts");
const { closeRegisterForm, setupRegisterForm } = require("../user/register");
const {
  closeBookingForm,
  setupBookingForm,
} = require("../booking/createBooking");
const { setupMyBookings } = require("../booking/myBooking");
import { Route } from "./interface";

const appRoutes: Route[] = [
  {
    path: "/",
    element: () => ``,
    init: () => {
      closeLoginForm();
      closeRegisterForm();
      closeBookingForm();
    },
  },
  {
    path: "/login",
    element: () => ``,
    init: () => {
      closeRegisterForm();
      closeBookingForm();
      setupLoginForm();
    },
  },
  {
    path: "/register",
    element: () => ``,
    init: () => {
      closeLoginForm();
      closeBookingForm();
      setupRegisterForm();
    },
  },
  {
    path: "/book-room",
    element: () => ``,
    init: () => {
      closeLoginForm();
      closeRegisterForm();
      setupBookingForm();
    },
  },
  {
    path: "/my-bookings",
    element: () => ``,
    init: () => {
      closeLoginForm();
      closeRegisterForm();
      setupMyBookings();
    },
  },
];

module.exports = appRoutes;
