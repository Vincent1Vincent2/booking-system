import { formatDate } from "cypress/support/utils";

describe("My bookings", () => {
  beforeEach(() => {
    cy.clearBookings();

    cy.visit("/");

    cy.login("fake@email.com", "password123");

    cy.createBookings();

    cy.get("[data-cy=bookingsBadge]").contains(3);

    cy.visit("/my-bookings");
  });

  it("check my bookings", () => {
    cy.get("[data-cy=bookingsContainer]").children().should("have.length", 3);
  });

  it("remove booking", () => {
    cy.get("[data-cy=deleteBookingBtn]").first().click();
    cy.get("[data-cy=confirmDeleteBtn]").click();

    cy.get("[data-cy=bookingsContainer]").children().should("have.length", 2);
    cy.get("[data-cy=bookingsBadge]").contains(2);
  });

  it("edit booking", () => {
    cy.get("[data-cy=room]").first().should("contain", "Room 1");
    cy.get("[data-cy=editBookingBtn]").first().click();

    const today = new Date();
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + 3);

    cy.get("[data-cy=dateSelector]").first().clear();
    cy.get("[data-cy=dateSelector]").first().type(formatDate(newDate));

    cy.get("select").select(2);
    cy.get("[data-cy=saveBookingBtn]").click();

    cy.get("[data-cy=dateSelector]")
      .last()
      .should("have.value", formatDate(newDate));

    cy.get("[data-cy=room]").last().should("contain", "Room 3");
  });

  /* it("edit booking to a date that already has a booking", () => {
    cy.get("[data-cy=bookingsContainer]")
      .children()
      .first()
      .find("[data-cy=dateSelector]")
      .invoke("text")
      .then((conflictingDate) => {
        cy.get("[data-cy=editBooking]").eq(1).click();
        cy.get("[data-cy=dateSelector]").first().clear();
        cy.get("[data-cy=dateSelector]").type(conflictingDate);
        cy.get("[data-cy=saveBookingBtn]").click();

        cy.get("body").should(
          "contain",
          "There is already a booking for this date and room"
        );
      });
  }); */
});
