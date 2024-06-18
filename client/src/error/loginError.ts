const { AxiosError } = require("axios");

export function loginError(error: typeof AxiosError) {
  if (error) {
    console.log(error);
    createErrorMessage(error.response.data.message);
  }
}

function createErrorMessage(errorMessage: string) {
  const errorMessageSpan = document.getElementById("errorMessage");
  errorMessageSpan!.innerHTML = errorMessage || "An unknown error has occurred";

  setTimeout(() => {
    errorMessageSpan!.innerHTML = "";
  }, 2000);
}

module.exports = {
  loginError,
};
