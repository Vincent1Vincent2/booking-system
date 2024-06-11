import axios from "axios";

const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;

const form = document.createElement("form");

const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.placeholder = "Email";
emailInput.name = "email";

const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.placeholder = "Password";
passwordInput.name = "password";

const recaptchaDiv = document.createElement("div");
recaptchaDiv.className = "g-recaptcha";
recaptchaDiv.setAttribute("data-sitekey", recaptchaSiteKey!);
recaptchaDiv.setAttribute("id", "recaptcha");

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.innerText = "Register";

form.appendChild(emailInput);
form.appendChild(passwordInput);
form.appendChild(recaptchaDiv);
form.appendChild(submitButton);

document.body.appendChild(form);

let recaptchaInitialized = false;

const loadRecaptcha = () => {
  return new Promise<void>((resolve) => {
    if (typeof window.grecaptcha !== "undefined") {
      window.grecaptcha.ready(() => {
        if (!recaptchaInitialized) {
          window.grecaptcha.render("recaptcha", {
            sitekey: recaptchaSiteKey,
          });
          recaptchaInitialized = true;
        }
        resolve();
      });
    } else {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.grecaptcha.ready(() => {
          if (!recaptchaInitialized) {
            window.grecaptcha.render("recaptcha", {
              sitekey: recaptchaSiteKey,
            });
            recaptchaInitialized = true;
          }
          resolve();
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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const recaptchaToken = window.grecaptcha.getResponse();

  if (!recaptchaToken) {
    alert("Please complete the reCAPTCHA");
    return;
  }

  try {
    const response = await axios.post(`${process.env.API_URL}/auth/register`, {
      email,
      password,
      recaptchaToken,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }

  window.grecaptcha.reset();
});
