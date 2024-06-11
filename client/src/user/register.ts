const axios = require("axios");
const {
  isProduction,
  loadRecaptcha,
  mockRecaptcha,
} = require("../utils/recaptcha.ts");

export function setupRegisterForm() {
  const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;

  const form = document.createElement("form");

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

  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(recaptchaDiv);
  form.appendChild(submitButton);

  document.body.appendChild(form);

  if (isProduction) {
    window.addEventListener("load", loadRecaptcha);
  } else {
    mockRecaptcha();
  }

  form.addEventListener("submit", async (e) => {
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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    if (isProduction) {
      window.grecaptcha.reset();
    }
  });
}
