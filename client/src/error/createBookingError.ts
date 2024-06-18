const { AxiosError } = require("axios");

export function createBookingError(error: typeof AxiosError) {
  if (error) {
    createErrorMessage(error.data.message);
  }
}

function createErrorMessage(errorMessage: string) {
  const errorMessageSpan = document.getElementById("errorMessage");
  errorMessageSpan!.innerHTML = errorMessage || "Unknown error occurred";

  setTimeout(() => {
    errorMessageSpan!.innerHTML = "";
  }, 2000);
}

module.exports = {
  createBookingError,
};
