const { AxiosError } = require("axios");

function roomError(error: typeof AxiosError) {
  if (error) {
    createErrorMessage();
  }
}

function createErrorMessage() {
  const errorMessageSpan = document.getElementById("errorMessage");
  errorMessageSpan!.innerHTML = "You need to login to book a room";
}

module.exports = {
  roomError,
};
