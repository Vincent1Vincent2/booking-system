describe("My bookings", () => {
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

  it("remove booking", () => {
    cy.get("[data-cy=deleteBooking]").first().click();
    cy.get("[data-cy=confirmDeleteBtn]").click();

    cy.get("[data-cy=bookingsContainer]").children().should("have.length", 2);
    cy.get("[data-cy=myBookingsBadge]").contains(2);
  });

  it("edit booking", () => {
    cy.get("[data-cy=editBooking]").first().click();

    const today = new Date();
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + 1);

    cy.get("[data-cy=dateSelector]").clear().type(newDate.toISOString());
    cy.get("[data-cy=saveBookingBtn]").click();

    cy.get("[data-cy=bookingsContainer]")
      .children()
      .first()
      .should("contain", newDate);
  });
});
