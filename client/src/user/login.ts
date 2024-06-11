const axios = require("axios");

export function setupLoginForm() {
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

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerText = "Login";
  submitButton.setAttribute("data-cy", "loginBtn");

  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);

  document.body.appendChild(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const response = await axios.post(`${process.env.API_URL}/auth/login`, {
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  });
}
