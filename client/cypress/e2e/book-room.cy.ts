describe("Book Room", () => {
  beforeEach(() => {
    cy.visit("https://booking-system-lovat.vercel.app/");

    cy.login("fake@email.com", "password123");

    cy.get("[data-cy=createBookingBtn]").click();

    cy.get("[data-cy=rooms]").children().should("have.length.at.least", 3);
  });

  it("Book current date and the next two days", () => {
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const dates = [today, tomorrow, dayAfterTomorrow].map(formatDate);

    dates.forEach((date) => {
      cy.get("[data-cy=rooms]").children().first().click();
      cy.get("[data-cy=dateSelector]").clear().type(date);

      cy.intercept("POST", `${Cypress.env("API_URL")}/bookings/booking`).as(
        "bookingRequest"
      );

      cy.get("[data-cy=bookButton]").click();

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
