describe("Check bookings", () => {
  beforeEach(() => {
    cy.visit("https://booking-system-lovat.vercel.app/");

    //BADGE NUMBER CHECK SHOULD BE DONE

    cy.get("[data-cy=myBookingsBtn]").click();
  });

  it("check my bookings", () => {
    cy.get("[data-cy=bookingsContainer]").children().should("have.length", 3);
  });
});
