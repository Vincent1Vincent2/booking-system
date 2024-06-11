const axios = require("axios");
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");

let loginForm: HTMLFormElement | null;

loginButton?.addEventListener("click", () => {
  setupLoginForm();
});

registerButton?.addEventListener("click", () => {
  closeLoginForm();
});

export function setupLoginForm() {
  loginForm = document.createElement("form");

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

  loginForm.appendChild(emailInput);
  loginForm.appendChild(passwordInput);
  loginForm.appendChild(submitButton);

  document.body.appendChild(loginForm);

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const response = await axios.post(
        `${process.env.API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const successMessage = document.createElement("p");
      successMessage.innerText = "Login successful";
      document.body.appendChild(successMessage);

      setTimeout(() => {
        successMessage.remove();
      }, 2000);
      closeLoginForm();
      const user = await axios.get(`${process.env.API_URL}/auth/user`, {
        withCredentials: true,
      });
      console.log("auth user", user.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  });
}

function closeLoginForm() {
  if (loginForm) {
    loginForm.remove();
    loginForm = null;
  }
}
