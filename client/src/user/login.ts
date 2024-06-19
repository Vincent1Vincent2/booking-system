const { login } = require("../utils/api/user.ts");
let loginForm: HTMLFormElement | null;

export function setupLoginForm() {
  if (document.getElementById("loginForm")) {
    return;
  }

  loginForm = document.createElement("form");
  loginForm.id = "loginForm";

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

  const submitButton = document.createElement("button");
  submitButton.id = "submitButton";
  submitButton.type = "submit";
  submitButton.innerText = "Login";
  submitButton.setAttribute("data-cy", "loginBtn");

  loginForm.appendChild(emailInput);
  loginForm.appendChild(passwordInput);
  loginForm.appendChild(submitButton);

  document.getElementById("app")?.appendChild(loginForm);

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    await login(email, password);
  });
}

export function closeLoginForm() {
  if (loginForm) {
    loginForm.remove();
    loginForm = null;
  }
}
