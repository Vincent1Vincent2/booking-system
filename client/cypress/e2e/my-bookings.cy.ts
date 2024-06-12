describe("Check Bookings", () => {
  beforeEach(() => {
    cy.visit("https://booking-system-lovat.vercel.app/");

    //BADGE NUMBER CHECK SHOULD BE DONE

    cy.get("[data-cy=myBookingsBtn]").click();
  });

  it("Check My Bookings", () => {
    cy.get("[data-cy=bookingsContainer]").children().should("have.length", 3);
  });
});
