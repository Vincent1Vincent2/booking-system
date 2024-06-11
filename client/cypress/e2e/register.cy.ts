describe("Register a user", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/", {
      onBeforeLoad(win) {
        // Mock the grecaptcha object for testing purposes
        win.grecaptcha = {
          ready: (callback) => callback(),
          render: (container, options) => {
            const recaptchaElement = document.getElementById(
              container as string
            );
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
      },
    });
  });

  it("Register a user", () => {
    /*     cy.get("[data-cy=registerButton]").click(); */

    cy.get("[data-cy=emailInput]").type("fake@email.com");
    cy.get("[data-cy=passwordInput]").type("password123");

    cy.get("[data-cy=emailInput]").should("have.value", "fake@email.com");
    cy.get("[data-cy=passwordInput]").should("have.value", "password123");

    cy.intercept("POST", `${Cypress.env("API_URL")}/auth/register`).as(
      "registerRequest"
    );

    cy.get("[data-cy=registerBtn]").click();

    cy.wait("@registerRequest").then((interception) => {
      if (interception.response) {
        assert.equal(
          interception.response.statusCode,
          200,
          "API call was successful"
        );
      } else {
        throw new Error("API request failed or was not intercepted correctly");
      }
    });

    cy.get("body").should("contain", "Registration successful");
  });
});
