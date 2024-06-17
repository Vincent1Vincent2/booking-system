import { formatDate } from "cypress/support/utils";

describe("Book room without logging in", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.visit("/book-room");
  });

  it("should not display booking form and should prompt to log in", () => {
    cy.get("body").should("contain", "To book you need to log in");
    cy.get("[data-cy=loginBtn]").should("exist");

    cy.get("[data-cy=roomSelector]").should("not.exist");
    cy.get("[data-cy=dateSelector]").should("not.exist");
    cy.get("[data-cy=bookBtn]").should("not.exist");
  });
});

describe("Book room on past dates", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.login("fake@email.com", "password123");

    cy.visit("/book-room");

    cy.get("[data-cy=bookButton]").click();

    cy.get("[data-cy=roomSelector]")
      .children()
      .should("have.length.at.least", 3);
  });

  it("should not allow booking past dates", () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(today.getDate() - 2);

    const dates = [yesterday, dayBeforeYesterday].map(formatDate);

    dates.forEach((date) => {
      cy.get("[data-cy=roomSelector]").select("Room 1", { force: true });

      cy.get("[data-cy=dateSelector]").clear();

      cy.get("[data-cy=dateSelector]").type(date, { force: true });

      cy.intercept("POST", `${Cypress.env("API_URL")}/bookings/book`).as(
        "bookingRequest"
      );

      cy.get("[data-cy=bookBtn]").click();

      cy.wait("@bookingRequest").then((interception) => {
        if (interception.response) {
          assert.equal(
            interception.response.statusCode,
            400,
            "API call was unsuccessful as expected"
          );
        } else {
          throw new Error(
            "API request failed or was not intercepted correctly"
          );
        }
      });

      cy.get("body").should("contain", "Booking unsuccessful");
    });
  });
});

describe("Book already booked room", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearBookings();

    cy.login("fake@email.com", "password123");

    cy.createBookings();

    cy.visit("/book-room");

    cy.get("[data-cy=bookButton]").click();

    cy.get("[data-cy=roomSelector]")
      .children()
      .should("have.length.at.least", 3);
  });

  it("should not allow booking already booked dates", () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const dates = [today, tomorrow, dayAfterTomorrow].map(formatDate);

    dates.forEach((date) => {
      cy.get("[data-cy=roomSelector]").select("Room 1", { force: true });

      cy.get("[data-cy=dateSelector]").clear();

      cy.get("[data-cy=dateSelector]").type(date, { force: true });

      cy.intercept("POST", `${Cypress.env("API_URL")}/bookings/book`).as(
        "failBookingRequest"
      );

      cy.get("[data-cy=bookBtn]").click();

      cy.wait("@failBookingRequest").then((interception) => {
        if (interception.response) {
          assert.equal(
            interception.response.statusCode,
            400,
            "API call was unsuccessful as expected"
          );
        } else {
          throw new Error(
            "API request failed or was not intercepted correctly"
          );
        }
      });

      cy.get("body").should("contain", "This day is already booked");
    });
  });
});
