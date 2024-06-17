describe("Invalid register and login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should not be possible to register with an existing email", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("API_URL")}/auth/register`,
      body: { email: "fake@email.com", password: "password123" },
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx status codes
    }).then((response) => {
      assert.equal(response.status, 409, "API call was successful");
    });
  });

  it("should not be possible to register without an email", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("API_URL")}/auth/register`,
      body: { email: "", password: "password123" },
      failOnStatusCode: false,
    }).then((response) => {
      assert.equal(response.status, 422, "API call was successful");
    });
  });

  it("should not be possible to register without a password", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("API_URL")}/auth/register`,
      body: { email: "fake@email.com", password: "" },
      failOnStatusCode: false,
    }).then((response) => {
      assert.equal(response.status, 422, "API call was successful");
    });
  });

  it("should not be possible to login without an email", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("API_URL")}/auth/login`,
      body: { email: "", password: "password123" },
      failOnStatusCode: false,
    }).then((response) => {
      assert.equal(response.status, 422, "API call was successful");
    });
  });

  it("should not be possible to login without a password", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("API_URL")}/auth/login`,
      body: { email: "fake@email.com", password: "" },
      failOnStatusCode: false,
    }).then((response) => {
      assert.equal(response.status, 422, "API call was successful");
    });
  });

  it("should not be possible to login with an invalid email", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("API_URL")}/auth/login`,
      body: { email: "invalidemail", password: "password123" },
      failOnStatusCode: false,
    }).then((response) => {
      assert.equal(response.status, 401, "API call was successful");
    });
  });

  it("should not be possible to login with an invalid password", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("API_URL")}/auth/login`,
      body: { email: "fake@email.com", password: "invalidpassword" },
      failOnStatusCode: false,
    }).then((response) => {
      assert.equal(response.status, 401, "API call was successful");
    });
  });
});
