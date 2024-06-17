describe("Invalid register and login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should not be possible to register with an existing email", () => {
    cy.register("fake@email.com", "password123");

    cy.intercept("POST", `${Cypress.env("API_URL")}/auth/register`).as(
      "registerRequest"
    );

    cy.wait("@registerRequest").then((interception) => {
      if (interception.response) {
        assert.equal(
          interception.response.statusCode,
          409,
          "API call was successful"
        );
      } else {
        throw new Error("API request failed or was not intercepted correctly");
      }
    });
  });

  it("should not be possible to register without a email", () => {
    cy.register("", "password123");

    cy.intercept("POST", `${Cypress.env("API_URL")}/auth/register`).as(
      "registerRequest"
    );

    cy.wait("@registerRequest").then((interception) => {
      if (interception.response) {
        assert.equal(
          interception.response.statusCode,
          422,
          "API call was successful"
        );
      } else {
        throw new Error("API request failed or was not intercepted correctly");
      }
    });
  });

  it("should not be possible to register without a password", () => {
    cy.register("fake@email.com", "");

    cy.intercept("POST", `${Cypress.env("API_URL")}/auth/register`).as(
      "registerRequest"
    );

    cy.wait("@registerRequest").then((interception) => {
      if (interception.response) {
        assert.equal(
          interception.response.statusCode,
          422,
          "API call was successful"
        );
      } else {
        throw new Error("API request failed or was not intercepted correctly");
      }
    });
  });
  it("should not be possible to login without a email", () => {
    cy.register("", "password123");

    cy.intercept("POST", `${Cypress.env("API_URL")}/auth/login`).as(
      "loginRequest"
    );

    cy.wait("@loginRequest").then((interception) => {
      if (interception.response) {
        assert.equal(
          interception.response.statusCode,
          422,
          "API call was successful"
        );
      } else {
        throw new Error("API request failed or was not intercepted correctly");
      }
    });
  });
  it("should not be possible to login without a password", () => {
    cy.register("fake@email.com", "");

    cy.intercept("POST", `${Cypress.env("API_URL")}/auth/login`).as(
      "loginRequest"
    );

    cy.wait("@loginRequest").then((interception) => {
      if (interception.response) {
        assert.equal(
          interception.response.statusCode,
          422,
          "API call was successful"
        );
      } else {
        throw new Error("API request failed or was not intercepted correctly");
      }
    });
  });

  it("should not be possible to login with invalid email", () => {
    cy.register("fake2@email.com", "password123");

    cy.intercept("POST", `${Cypress.env("API_URL")}/auth/login`).as(
      "loginRequest"
    );

    cy.wait("@loginRequest").then((interception) => {
      if (interception.response) {
        assert.equal(
          interception.response.statusCode,
          401,
          "API call was successful"
        );
      } else {
        throw new Error("API request failed or was not intercepted correctly");
      }
    });
  });
  it("should not be possible to login with invalid password", () => {
    cy.register("fake@email.com", "password1234");

    cy.intercept("POST", `${Cypress.env("API_URL")}/auth/login`).as(
      "loginRequest"
    );

    cy.wait("@loginRequest").then((interception) => {
      if (interception.response) {
        assert.equal(
          interception.response.statusCode,
          401,
          "API call was successful"
        );
      } else {
        throw new Error("API request failed or was not intercepted correctly");
      }
    });
  });
});
