const { setupLoginForm } = require("../user/login.ts");

function currentBookingError(
  errorStatus: number,
  currentContainer: HTMLElement
) {
  if (errorStatus === 404) {
    noCurrentBookings(currentContainer);
  } else if (errorStatus === 401) {
    unauthorizedError();
  } else {
    generalError(currentContainer);
  }
}

function archivedBookingError(
  errorStatus: number,
  archivedContainer: HTMLElement
) {
  if (errorStatus === 404) {
    noArchivedBookings(archivedContainer);
  } else if (errorStatus === 401) {
    return;
  } else {
    generalError(archivedContainer);
  }
}

function noCurrentBookings(currentContainer: HTMLElement) {
  const h3 = document.createElement("h3");
  h3.innerHTML = "No upcoming Bookings";
  currentContainer?.appendChild(h3);
}

function noArchivedBookings(archivedContainer: HTMLElement) {
  const h3 = document.createElement("h3");
  h3.innerHTML = "No Archived Bookings";
  archivedContainer?.appendChild(h3);
}

function generalError(
  currentContainer?: HTMLElement,
  archivedContainer?: HTMLElement
) {
  const h3 = document.createElement("h3");
  h3.innerHTML = "A unknown error has occurred, please re-log and try again";
  if (currentContainer) {
    currentContainer?.appendChild(h3);
  } else {
    archivedContainer?.appendChild(h3);
  }
}

function unauthorizedError() {
  const errorMessageSpan = document.getElementById("errorMessage");
  errorMessageSpan!.innerHTML = "You need to login to access your bookings";
  setupLoginForm();
}

module.exports = {
  currentBookingError,
  archivedBookingError,
};
