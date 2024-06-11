describe("Login a user", () => {
  it("Login a user", () => {
    cy.visit("http://localhost:9000/");
    cy.get("[data-cy=loginButton]").click();

    cy.get("[data-cy=emailInput]").type("fake@email.com");
    cy.get("[data-cy=passwordInput]").type("password123");

    cy.get("[data-cy=emailInput]").should("have.value", "fake@email.com");
    cy.get("[data-cy=passwordInput]").should("have.value", "password123");

    cy.intercept("POST", `${Cypress.env("API_URL")}/auth/login`).as(
      "loginRequest"
    );

    cy.get("[data-cy=loginBtn]").click();

    cy.wait("@loginRequest").then((interception) => {
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

    cy.get("body").should("contain", "Login successful");
  });
});
