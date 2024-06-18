const { AxiosError } = require("axios");

export function createBookingError(error: typeof AxiosError) {
  if (error) {
    createError(error.data.message);
  }
}

export function archivedBookingError(
  errorStatus: number,
  archivedContainer: HTMLElement
) {
  if (errorStatus === 404) {
    noArchivedBookings(archivedContainer);
  } else {
    generalError(archivedContainer);
  }
}

export function currentBookingError(
  errorStatus: number,
  currentContainer: HTMLElement
) {
  if (errorStatus === 404) {
    noCurrentBookings(currentContainer);
  } else {
    generalError(currentContainer);
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

function createError(errorMessage: string) {
  const h3 = document.createElement("h3");
  h3.innerHTML = errorMessage || "Unknown error occurred";
  document.getElementById("app")?.appendChild(h3);
  setTimeout(() => {
    h3.remove();
  }, 2000);
}

module.exports = {
  createBookingError,
  currentBookingError,
  archivedBookingError,
};
