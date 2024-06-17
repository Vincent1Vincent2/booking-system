describe("Check bookings", () => {
  beforeEach(() => {
    cy.clearBookings();

    cy.visit("/");

    cy.login("fake@email.com", "password123");

    cy.createBookings();

    cy.get("[data-cy=myBookingsBadge]").contains(3);

    cy.get("[data-cy=myBookingsBtn]").click();
  });

  it("check my bookings", () => {
    cy.get("[data-cy=bookingsContainer]").children().should("have.length", 3);
  });
});
