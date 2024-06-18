export const isProduction = process.env.NODE_ENV === "production";

export function loadRecaptcha() {
  return new Promise<void>((resolve) => {
    if (typeof window.grecaptcha !== "undefined") {
      window.grecaptcha.ready(() => {
        const recaptchaElement = document.getElementById("recaptcha");
        if (recaptchaElement && !recaptchaElement.hasChildNodes()) {
          window.grecaptcha.render("recaptcha", {
            sitekey: process.env.RECAPTCHA_SITE_KEY,
          });
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
          const recaptchaElement = document.getElementById("recaptcha");
          if (recaptchaElement && !recaptchaElement.hasChildNodes()) {
            window.grecaptcha.render("recaptcha", {
              sitekey: process.env.RECAPTCHA_SITE_KEY,
            });
          }
          resolve();
        });
      };
      document.head.appendChild(script);
    }
  });
}

export function mockRecaptcha() {
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
