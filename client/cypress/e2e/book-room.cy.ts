import { formatDate } from "cypress/support/utils";

describe("Book Room", () => {
  beforeEach(() => {
    cy.clearBookings();
    cy.visit("/");

    cy.login("fake@email.com", "password123");

    cy.visit("/book-room");

    cy.get("[data-cy=bookButton]").click();

    cy.get("[data-cy=roomSelector]")
      .children()
      .should("have.length.at.least", 3);
  });

  it("book current date and the next two days", () => {
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
          throw new Error(
            "API request failed or was not intercepted correctly"
          );
        }
      });

      cy.get("body").should("contain", "Booking successful");
    });
  });
});
