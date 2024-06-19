const { register } = require("../utils/api/user.ts");
const {
  isProduction,
  loadRecaptcha,
  mockRecaptcha,
} = require("../utils/api/recaptcha");
let registerForm: HTMLFormElement | null;

export function setupRegisterForm() {
  if (registerForm) {
    return;
  }

  const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;

  registerForm = document.createElement("form");
  registerForm.id = "registerForm";

  const emailInput = document.createElement("input");
  emailInput.id = "emailInput";
  emailInput.type = "email";
  emailInput.placeholder = "Email";
  emailInput.name = "email";
  emailInput.setAttribute("data-cy", "emailInput");

  const passwordInput = document.createElement("input");
  passwordInput.id = "passwordInput";
  passwordInput.type = "password";
  passwordInput.placeholder = "Password";
  passwordInput.name = "password";
  passwordInput.setAttribute("data-cy", "passwordInput");

  const recaptchaDiv = document.createElement("div");
  recaptchaDiv.className = "g-recaptcha";
  recaptchaDiv.setAttribute("data-sitekey", recaptchaSiteKey!);
  recaptchaDiv.setAttribute("id", "recaptcha");

  const submitButton = document.createElement("button");
  submitButton.id = "submitButton";
  submitButton.type = "submit";
  submitButton.innerText = "Register";
  submitButton.setAttribute("data-cy", "registerBtn");

  registerForm.appendChild(emailInput);
  registerForm.appendChild(passwordInput);
  registerForm.appendChild(recaptchaDiv);
  registerForm.appendChild(submitButton);

  document.getElementById("app")?.appendChild(registerForm);

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

    await register(email, password, recaptchaToken);

    if (isProduction) {
      window.grecaptcha.reset();
    }
  });
}

export function closeRegisterForm() {
  if (registerForm) {
    registerForm.remove();
    registerForm = null;
  }
}
