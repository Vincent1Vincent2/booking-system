/// <reference types="cypress" />

import { formatDate } from "./utils";

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
  cy.session({ username, password }, () => {
    cy.visit("/login");
    cy.get("[data-cy=emailInput]").type(username);
    cy.get("[data-cy=passwordInput]").type(password);

    cy.get("[data-cy=emailInput]").should("have.value", username);
    cy.get("[data-cy=passwordInput]").should("have.value", password);

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

    // - Make a authentication request since cookies cant be accessed from client side
    cy.request(`${Cypress.env("API_URL")}/auth/user`).then((authResponse) => {
      expect(authResponse.status).to.eq(200);
    });
  });
});

Cypress.Commands.add("register", (username: string, password: string) => {
  cy.session({ username, password }, () => {
    cy.visit("/register");
    cy.get("[data-cy=emailInput]").type(username);
    cy.get("[data-cy=passwordInput]").type(password);

    cy.get("[data-cy=emailInput]").should("have.value", username);
    cy.get("[data-cy=passwordInput]").should("have.value", password);

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
  });
});

Cypress.Commands.add("createBookings", () => {
  cy.visit("/book-room");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const dates = [today, tomorrow, dayAfterTomorrow].map(formatDate);

  dates.forEach((date) => {
    cy.get("[data-cy=roomSelector]").select("Room 1");

    cy.get("[data-cy=dateSelector]").clear();

    cy.get("[data-cy=dateSelector]").type(date);

    cy.intercept("POST", `${Cypress.env("API_URL")}/bookings/book`).as(
      "bookingRequest"
    );

    cy.get("[data-cy=bookBtn]").click();

    cy.wait("@bookingRequest").then((interception) => {
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
  });
});

Cypress.Commands.add("clearBookings", () => {
  cy.task("clearBookings");
});
