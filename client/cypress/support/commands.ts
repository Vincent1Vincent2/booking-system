/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.session(
    username,
    () => {
      cy.visit(Cypress.env("BASE_URL") + "/login");
      cy.get("[data-cy=emailInput]").type(username);
      cy.get("[data-cy=passwordInput]").type(password);

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
          throw new Error(
            "API request failed or was not intercepted correctly"
          );
        }
      });
    },

    {
      validate: () => {
        cy.getCookie("access_token").should("exist");
      },
    }
  );
});
