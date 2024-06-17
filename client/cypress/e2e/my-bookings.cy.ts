describe("Check bookings", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.get("[data-cy=myBookingsBadge]").contains(3);

    cy.get("[data-cy=myBookingsBtn]").click();
  });

  it("check my bookings", () => {
    cy.get("[data-cy=bookingsContainer]").children().should("have.length", 3);
  });
});
