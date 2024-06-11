const axios = require("axios");
const {
  isProduction,
  loadRecaptcha,
  mockRecaptcha,
} = require("../utils/recaptcha.ts");
const { setupLoginForm } = require("../user/login.ts");
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");

let registerForm: HTMLFormElement | null;

registerButton?.addEventListener("click", () => {
  setupRegisterForm();
});

loginButton?.addEventListener("click", () => {
  closeRegisterForm();
});

export function setupRegisterForm() {
  const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;

  registerForm = document.createElement("form");

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.placeholder = "Email";
  emailInput.name = "email";
  emailInput.setAttribute("data-cy", "emailInput");

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Password";
  passwordInput.name = "password";
  passwordInput.setAttribute("data-cy", "passwordInput");

  const recaptchaDiv = document.createElement("div");
  recaptchaDiv.className = "g-recaptcha";
  recaptchaDiv.setAttribute("data-sitekey", recaptchaSiteKey!);
  recaptchaDiv.setAttribute("id", "recaptcha");

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerText = "Register";
  submitButton.setAttribute("data-cy", "registerBtn");

  registerForm.appendChild(emailInput);
  registerForm.appendChild(passwordInput);
  registerForm.appendChild(recaptchaDiv);
  registerForm.appendChild(submitButton);

  document.body.appendChild(registerForm);

  if (isProduction) {
    window.addEventListener("load", loadRecaptcha);
  } else {
    mockRecaptcha();
  }

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const recaptchaToken = isProduction
      ? window.grecaptcha.getResponse()
      : "mocked-recaptcha-token";

    if (!recaptchaToken && isProduction) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.API_URL}/auth/register`,
        {
          email,
          password,
          recaptchaToken,
        }
      );

      const successMessage = document.createElement("p");
      successMessage.innerText = "Registration successful";
      document.body.appendChild(successMessage);

      setTimeout(() => {
        successMessage.remove();
      }, 2000);
      closeRegisterForm();
      setupLoginForm();

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    if (isProduction) {
      window.grecaptcha.reset();
    }
  });
}

function closeRegisterForm() {
  if (registerForm) {
    registerForm.remove();
    registerForm = null;
  }
}
