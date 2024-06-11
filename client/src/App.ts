import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
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

  let recaptchaInitialized = false;

  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    // Load reCAPTCHA
    const loadRecaptcha = () => {
      return new Promise<void>((resolve) => {
        if (typeof window.grecaptcha !== "undefined") {
          if (!recaptchaInitialized) {
            window.grecaptcha.ready(() => {
              const recaptchaElement = document.getElementById("recaptcha");
              if (recaptchaElement && !recaptchaElement.hasChildNodes()) {
                window.grecaptcha.render("recaptcha", {
                  sitekey: recaptchaSiteKey,
                });
                recaptchaInitialized = true;
              }
              resolve();
            });
          } else {
            resolve();
          }
        } else {
          const script = document.createElement("script");
          script.src = "https://www.google.com/recaptcha/api.js";
          script.async = true;
          script.defer = true;
          script.onload = () => {
            window.grecaptcha.ready(() => {
              if (!recaptchaInitialized) {
                const recaptchaElement = document.getElementById("recaptcha");
                if (recaptchaElement && !recaptchaElement.hasChildNodes()) {
                  window.grecaptcha.render("recaptcha", {
                    sitekey: recaptchaSiteKey,
                  });
                  recaptchaInitialized = true;
                }
                resolve();
              }
            });
          };
          document.head.appendChild(script);
        }
      });
    };

    const initializeRecaptcha = async () => {
      await loadRecaptcha();
    };

    window.addEventListener("load", initializeRecaptcha);
  } else {
    // For non-production environments, mock the reCAPTCHA functions to allow testing
    window.grecaptcha = {
      ready: (callback) => callback(),
      render: (container, options) => {
        const recaptchaElement = document.getElementById(container as string);
        if (recaptchaElement) {
          recaptchaElement.innerHTML = `<input type="hidden" class="g-recaptcha-response" value="mocked-recaptcha-token">`;
        }
      },
      execute: (siteKey, options) => {
        return new Promise((resolve) => {
          resolve("mocked-recaptcha-token");
        });
      },
      getResponse: () => "mocked-recaptcha-token",
      reset: () => {},
    };
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
});
